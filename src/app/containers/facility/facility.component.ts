import { Component, OnInit, ViewContainerRef, ViewChild, Inject } from '@angular/core';
import { AlertService, OshaService } from '../../_services';
import { NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean;
  loading_submit: boolean;
  mode: number;
  index: string;
  is_loading: boolean = true;
  
  view_index: string = '';
  //=====================
  objects: any;
  object_ids: Array<string> = [];
  fields: any;
  items_page_order: Array<any> = [];
  view_display_order: Array<any> = [];
  insert_display_order: Array<any> = [];
  //===== reference ======
  references: Array<any> = [];
  //===== root name ======
  root_field_name: string = '';
  //===== table name =====
  tableName: string;  //Table Name
  api_url_value: string;  //API url path
  
  constructor(private alertService: AlertService, public oshaService: OshaService,
              config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder,
              private route:ActivatedRoute, private router:Router) {
      
      this.tableName = this.router.url.split('/')[1];
      this.api_url_value = this.tableName.replace(/\_/gi, "-");

      //===== Initialize Modal Values ======================
      this.is_loading = true;
      this.submitted = false;
      this.loading_submit = false;
      this.mode = -1;
      this.index = '';
   }

  ngOnInit() {
      this.oshaService.get_object_fields(this.tableName).subscribe( res=>{
      this.fields = res;

      this.sort_fields_by('items_page_order');
      for (let field of this.fields){
        if(field.type == 'reference')
        {
          var temp_url:string = field.type_value;

          temp_url = this.remove__c(temp_url.substring(0, temp_url.indexOf('.'))).toLowerCase();
    
          if(temp_url == 'hipaa_contact') //Exception For Hipaa_contact__c
          {
            temp_url = 'contact';
          }

          else if (temp_url == 'vendors') //Exception For Organization_info__c
          {
            temp_url = 'vendor'
          }
          this.oshaService.get_objects(temp_url).subscribe( res => {
            this.references[field.name] = res;
          });
        }
        if(field.items_page_order != '0')
        {
          this.items_page_order.push(field);
        }
      }

      this.sort_fields_by('view_display_order');
      for (let field of this.fields){
        if(field.view_display_order != '0')
          this.view_display_order.push(field);
      }

      this.sort_fields_by('insert_display_order');
      for (let field of this.fields){
        if(field.insert_display_order != '0')
          this.insert_display_order.push(field);
      }
      // console.log(this.items_page_order);
      // console.log(this.view_display_order);
      // console.log(this.insert_display_order);

      //===== Initialize Add Form ===============
      this.addForm = this.formBuilder.group({});
      for (let field of this.insert_display_order)
      {
        let control_name = '';
        //=== Check Type If root 
        if( field.type != 'root' )
        {
          control_name = this.remove__c(field.name);
        }
        else
        {
          this.root_field_name = this.remove__c(field.name);
          continue;
        }
        
        //=== Add Control to Add Form 
        this.addForm.addControl(control_name, this.formBuilder.control(''));
        if( field.nillable == '0' )
        {
          this.f[control_name].setValidators([Validators.required]);
        } 
        if( field.length != null)
        {
          this.f[control_name].setValidators(Validators.maxLength(field.length));
        }
        if( field.type == 'double')
        {
          this.f[control_name].setValidators(Validators.maxLength(5));
        }
      }
      console.log(this.references);
      //===== Get All Objects ===================
      this.render_object();
    });
  }

  render_object(){
    this.is_loading = true;
    this.oshaService.get_objects(this.api_url_value).subscribe( res => {
        this.objects = res; 
        this.object_ids = [];
        for(var key in res.data) {
            this.object_ids.push(key);
            if(this.objects.data[key].Active == "true")
                this.objects.data[key].Active = 1
            else
                this.objects.data[key].Active = 0    
        }
        console.log(this.objects);
        this.is_loading = false;
        var script = document.createElement('script');
        script.src = '/assets/js/resize.js';
        document.head.appendChild(script); 
    },
    err => {
      this.router.navigateByUrl('/404');
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }
    this.loading_submit = true;

    for( let field in this.addForm.controls )
    {
      if(this.f[field].value == true)
        this.f[field].setValue(1);
      else if(this.f[field].value == false)
        this.f[field].setValue(0);
    }

    if(this.mode == 0)
    {
      this.addForm.addControl(this.root_field_name, this.formBuilder.control(''));
      let root_value = this.objects.data[this.object_ids[0]][this.root_field_name];
      this.f[this.root_field_name].setValue(root_value);
      
      console.log(this.addForm.value);
      let request_form = [{"id": "", "data": this.addForm.value}];
      this.oshaService.add_object(request_form, this.api_url_value);
      this.addForm.removeControl(this.root_field_name);
    }
    else if(this.mode == 2)
    {
      let request_form = [{"id": this.index, "data": this.addForm.value}];
      console.log(request_form);
      this.oshaService.update_object(request_form, this.api_url_value);
    } 
    this.loading_submit = false;
    
  }

  delete(id){
    this.oshaService.delete_object(id, this.api_url_value);
  }

  get f() { return this.addForm.controls; }

  open(content, mode, index = '') {
    this.mode = mode;
    this.index = index;
    if (mode == 0) // create modal
    {
      this.set_values(null);
      this.modalService.open(content, { size: 'lg' });
    }
    else if (mode == 1) // show modal
    {
      this.view_index = index;
      this.modalService.open(content, { size: 'lg' });
    }
    else if (mode == 2) // edit modal
    {
      this.set_values(index);
      this.modalService.open(content, { size: 'lg' });
    }  
  }

  set_values(index){
    if (index == null)
    {
      for( let field in this.addForm.controls)
      {
        this.f[field].setValue('');
      }
    }
    else
    {
      for( let field in this.addForm.controls)
      {
        this.f[field].setValue(this.objects.data[index][field]);
      }
    }
  }

  sort_fields_by(key){
    if ( key == 'items_page_order' )
    {
      this.fields.sort((n1, n2) => {
        return this.naturalCompare(n1.items_page_order.toString(), n2.items_page_order.toString());
      });
    }
    else if ( key == 'view_display_order' )
    {
      this.fields.sort((n1, n2) => {
        return this.naturalCompare(n1.view_display_order.toString(), n2.view_display_order.toString());
      });
    }
    else if ( key == 'insert_display_order' )
    {
      this.fields.sort((n1, n2) => {
        return this.naturalCompare(n1.insert_display_order.toString(), n2.insert_display_order.toString());
      });
    }
  }

  naturalCompare(a, b) {
    var ax = [], bx = [];
 
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
 
    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }
 
    return ax.length - bx.length;
  }

  remove__c(string){
    return string.replace(/\__c/gi, "");
  }

  afterDot(string){
    return string.substring(string.indexOf('.')+1, string.length);
  }

  replace_space(string){
    return string.replace(/\_/gi, " ");
  }

  print(control_name, err){
    if(err.hasOwnProperty('maxlength')){
      return `${control_name} has wrong length! Required length: ${err.maxlength.requiredLength}`;
    }
    else if(err.hasOwnProperty('required')){
      return `${control_name} is required!`;
    }
  }
  make_keys(item_name){
    let _keys: Array<string> = [];
    for(var key in this.references[item_name].data) {
      _keys.push(key);
    }
    return _keys;
  }
}
