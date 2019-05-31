import { Component, OnInit, ViewContainerRef, ViewChild, Inject } from '@angular/core';
import { AlertService, OshaService, AuthenticationService } from '../../_services';
import { NgbModalConfig, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  object_ids: Array<string> = []
  fields: any = []
  items_page_order: Array<any> = []
  view_display_order: Array<any> = []
  insert_display_order: Array<any> = []
  //===== reference ======
  references: Array<any> = []
  //===== root name ======
  root_field_name: string = ''
  parent_field_name: string = ''
  //===== table name =====
  tableName: string  //Table Name
  api_url_value: string  //API url path
  //===== action requires =====
  can_edit: number = 0
  can_insert: number = 0
  can_delete: number = 0
  //===== tab =================
  incident_tabs = ['Incident', 'Breach']
  change_request_tabs = ['Basic', 'CAB Details']

  has_tab: boolean = false
  tabs = { 'security_incident': { 'index': 14, tabs: ['Incident', 'Breach']}, 
           'change_request': { 'index': 6, tabs: ['Basic', 'CAB Details']}
          }
  //===== additional table and buttons =====
  exception_log: any;
  exception_ids: Array<any> = []
  exception_fields: Array<{field: string, label: string}> = [ {field: 'Name', label: 'Record ID'}, {field: 'Exception_Text', label: 'Log Text'}, 
                                                              {field: 'Module', label: 'Module'}, {field: 'CreatedDate', label: 'Created Date(PST)'}]
  login_history: any;    
  login_ids: Array<any> = []
  login_fields: Array<{field: string, label: string}> = [ {field: 'emailId', label: 'Email ID'}, {field: 'browser', label: 'Browser'}, 
                                                          {field: 'ipAddress', label: 'Source IP'}, {field: 'status', label: 'Status'},
                                                          {field: 'serverurl', label: 'Login URL'}, {field: 'createdDate', label: 'Login Time(PST)'}]
                                                          
  location_history: any;    
  location_ids: Array<any> = []
  location_fields: Array<{field: string, label: string}> = [ {field: 'Name', label: 'Record No'}, {field: 'Facility_Name', label: 'Facility Name'}, 
                                                          {field: 'Room_Name', label: 'Room Name'}, {field: 'Start Date', label: 'Date_Start'},
                                                          {field: 'Date_End', label: 'End Date'}, {field: 'Comments', label: 'Comments'}]   
  location_rooms: any
  location_room_ids: Array<string> = []   
  locationForm: FormGroup    
  active_modal_ref: NgbModalRef                                                
  //===== converted ===========
  is_converted: boolean = false
  convert_submitting: boolean = false
  //===== file upload =========
  fileToUpload: File = null
  noteAll: any = null
  noteId: string = null

  constructor(private alertService: AlertService, public oshaService: OshaService,
              config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder,
              private route:ActivatedRoute, private router:Router, public authenticationService: AuthenticationService) {
      
      this.tableName = this.router.url.split('/')[1]
      if(this.tableName == 'logout')
      {
        this.logout()
      }
      //===== Initialize Modal Values ======================
      this.is_loading = true
      this.submitted = false
      this.loading_submit = false
      this.mode = -1
      this.index = ''
      this.has_tab = false

      if( this.tabs.hasOwnProperty(this.tableName)){
        this.has_tab = true 
      }
      //===== Featured For Hipaa ==========================
      if( this.tableName == 'hipaa_contact'){
        this.oshaService.get_objects('login-history').subscribe( res => {
          this.login_history = res.data
        });
        this.oshaService.get_objects('exception-log').subscribe( res => {
          this.exception_log = res.data
        });
      }
      else if ( this.tableName == 'hardware_inventory'){
        this.oshaService.get_objects('location-history').subscribe( res => {
          this.location_history = res.data
        });
        this.oshaService.get_objects('room').subscribe( res => {
          this.location_rooms = res.data
        });
        this.locationForm = this.formBuilder.group({
          Room: ['', Validators.required],
          Date_Start: [''],
          Comments: [''],
          Hardware_Inventory: ['', Validators.required]
        });
      }
  }

  ngOnInit() {
      this.oshaService.get_object_fields(this.tableName).subscribe( res=>{
      this.fields = res.fields

      this.sort_fields_by('items_page_order')
      for (let field of this.fields){
        this.api_url_value = field.api_url_value
        if(field.type == 'reference' || field.type == 'parent')
        {
          var temp_url:string = field.type_value

          var temp_table_name = this.remove__c(temp_url.substring(0, temp_url.indexOf('.'))).toLowerCase()
    
          this.oshaService.get_object_fields(temp_table_name).subscribe( data=>{
            if(data.fields.length > 0)
            {
              this.oshaService.get_objects(data.fields[0].api_url_value).subscribe( res => {
                this.references[field.name] = res
              });
            }
          });
        }
        if(field.items_page_order != '0')
        { 
          this.items_page_order.push(field)
        }
        this.can_insert = field.insert
        this.can_edit = field.edit
        this.can_delete = field.delete
      }

      this.sort_fields_by('view_display_order')
      for (let field of this.fields){
        if(field.view_display_order != '0' && field.type != 'root')
          this.view_display_order.push(field)
      }

      this.sort_fields_by('insert_display_order')
      for (let field of this.fields){
        if(field.insert_display_order != '0')
          this.insert_display_order.push(field)
      }
      // console.log(this.items_page_order);
      // console.log(this.view_display_order);
      // console.log(this.insert_display_order);

      //===== Initialize Add Form ===============
      this.addForm = this.formBuilder.group({})
      for (let field of this.insert_display_order)
      {
        let control_name = ''
        //=== Check Type If root 
        if( field.type != 'root' )
        {
          control_name = this.remove__c(field.name)
          if( field.type == 'parent' )
            this.parent_field_name = this.remove__c(field.name) 
        }
        else
        {
          this.root_field_name = this.remove__c(field.name)
          continue;
        }
        
        //=== Add Control to Add Form 
        
        let validator = []
        if( field.nillable == 0)
        {
          validator.push(Validators.required)
        } 
        if( field.length > 0 )
        {
          validator.push(Validators.maxLength(field.length))
        }
        if( field.type == 'double')
        {
          validator.push(Validators.maxLength(5))
        }
        this.addForm.addControl(control_name, new FormControl('', validator))
      }
      //===== Get All Objects ===================
      this.render_object()
    });
  }

  render_object(){
    this.is_loading = true;
    this.oshaService.get_objects(this.api_url_value).subscribe( res => {
        this.objects = res
        this.object_ids = []
        for(var key in res.data) {
            this.object_ids.push(key)
        }
        this.is_loading = false
        var script = document.createElement('script')
        script.src = '/assets/js/resize.js'
        document.head.appendChild(script)
        this.oshaService.success_alert = ''
        this.oshaService.error_alert = ''
    },
    err => {
      
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid && this.addForm.errors != null) {
      return;
    }
    this.loading_submit = true;

    for( let field in this.addForm.controls )
    {
      if(this.f[field].value === true)
      {
        this.f[field].setValue('true');
      }
      else if(this.f[field].value === false)
      {
        this.f[field].setValue('false');
      }
    }

    if(this.mode == 0)
    {
      if(this.root_field_name != '')
      {
        this.addForm.addControl(this.root_field_name, this.formBuilder.control(''));
        let root_value = localStorage.getItem('org_id'); //temporary
        this.f[this.root_field_name].setValue(root_value);
      }
      let request_form = [{"id": "", "data": this.addForm.value}];
      // Call Add API
      this.oshaService.add_object(request_form, this.api_url_value).subscribe( res => {
        res = res[0];
                
        if(res['status'] == "success")
        { 
            this.modalService.dismissAll();
            this.oshaService.success_alert = res['message'];
            this.render_object();
        }  
        else
          this.oshaService.error_alert = res['message'];

        if(this.fileToUpload != null){
          this.oshaService.upload_file(this.fileToUpload, 'policy-and-procedure', res.data.id).subscribe( res => {
            this.fileToUpload = null
          })
        }    
        this.loading_submit = false;
      })

      this.addForm.removeControl(this.root_field_name);
      
    }
    else if(this.mode == 2)
    {
      let parent;
      if(this.parent_field_name != ''){
        parent = this.f[this.parent_field_name]
        this.addForm.removeControl(this.parent_field_name)
      }

      let request_form = [{"id": this.index, "data": this.addForm.value}];

      if(this.parent_field_name != '')
        this.addForm.addControl(this.parent_field_name, parent)

      this.oshaService.update_object(request_form, this.api_url_value);
      
      // Update Add API
      this.oshaService.update_object(request_form, this.api_url_value).subscribe( res => {
        res = res[0]
                
        if(res['status'] == "success")
        { 
            this.modalService.dismissAll()
            this.oshaService.success_alert = res['message']
            this.render_object()
        } 
        else
          this.oshaService.error_alert = res['message']

        if(this.fileToUpload != null){
          this.oshaService.upload_file(this.fileToUpload, 'policy-and-procedure', this.index).subscribe( res => {
            this.fileToUpload = null
          })
        }  
        this.loading_submit = false
      })
    } 
  }

  delete(id){
    this.oshaService.delete_object(id, this.api_url_value).subscribe( res => {
             
      if(res['status'] == "success")
      { 
          this.oshaService.success_alert = res['message']
          this.render_object()
      } 
      else
        this.oshaService.error_alert = res['message']
      this.loading_submit = false
    })
  }

  get f() { return this.addForm.controls; }
  get f_location() { return this.locationForm.controls; }

  open(content, mode, index = '') {
    this.modalService.dismissAll();
    this.mode = mode;
    this.index = index;
    if (mode == 0) // create modal
    {
      if(index == '')
        this.set_values(null)
      else
        this.set_values(index)
    }
    else if (mode == 1) // show modal
    {
      this.view_index = index
      if( this.tableName == 'lead' )
      {
        if( this.objects.data[index]['isConverted'] == 'false')
          this.is_converted = false
        else  
          this.is_converted = true
      }
      else if( this.tableName == 'hipaa_contact' ){
        this.login_ids = [] 
        this.exception_ids = []

        for(let key in this.login_history) {
          if(this.login_history[key].hipaaContactId == index)
            this.login_ids.push(key)
        }
        for(let key in this.exception_log) {
          if(this.exception_log[key].HIPAA_Contact == index)
            this.exception_ids.push(key)
        }
      }
      else if( this.tableName == 'hardware_inventory')
      {
        this.location_ids = []
        for(let key in this.location_history) {
          if(this.location_history[key].Hardware_Inventory == index)
            this.location_ids.push(key)
        }
        this.location_room_ids = []
        for(let key in this.location_rooms) {
          this.location_room_ids.push(key)
        }
      }
      else if( this.tableName == 'policy_and_procedure')
      {
        this.noteAll = null
        this.noteId = null
        this.oshaService.get_all_notes(this.index).subscribe( res => {
          this.noteAll = res.data
          let keys = Object.keys(res.data)
          this.noteId = keys[0]
        })
        
      }
    }
    else if (mode == 2) // edit modal
    {
      this.set_values(index)
    }  
    this.modalService.open(content, { size: 'lg' })
  }

  set_values(index){
    if (index == null)
    {
      for( let field in this.addForm.controls)
      {
        if(this.get_field_type(field) == 'boolean')
          this.f[field].setValue('false');
        else
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

  convert_lead(index){

    this.convert_submitting = true;
    let request_form = [{"id": index, "data": {"isConverted":1}}]
    // Convert Lead
    this.oshaService.update_object(request_form, this.api_url_value).subscribe( 
      res => {
        res = res[0]
                
        if(res['status'] == "success")
        { 
            this.modalService.dismissAll()
            this.oshaService.success_alert = res['message']
            this.convert_submitting = false;
            this.render_object()
        } 
        else
          this.oshaService.error_alert = res['message']
        this.convert_submitting = false
      }, 
      err=>{
        this.convert_submitting = false
        console.log(err)
      }
    )
  }

  create_new_location(index, content){
    this.f_location.Hardware_Inventory.setValue(index)
    this.active_modal_ref = this.modalService.open(content)
  }

  reset_password(index){
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to reset password for this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, rest it!'
    }).then((result) => {
      if (result.value){
        this.oshaService.reset_password(index).subscribe( res => {        
          Swal.fire(
            'Reseted!',
            res.message,
            'success'
          )
        }, err=>{
            Swal.fire(
              'Cannot Reset!',
              'Invalid User ID in OAuth!',
              'error'
            )
        })
      }
    })
  }

  save_location_history()
  {
    this.submitted = true
    // stop here if form is invalid
    if (this.locationForm.invalid && this.locationForm.errors != null) {
      return
    }
    this.loading_submit = true
    let request_form = [{"id": "", "data": this.locationForm.value}]
    // Call Add API
    this.oshaService.add_object(request_form, 'location-history').subscribe( res => {
      res = res[0]
                
      if(res['status'] == "success")
      { 
          this.active_modal_ref.dismiss()

          Swal.fire(
            'Success!',
            res['message'],
            'success'
          )

          this.oshaService.get_objects('location-history').subscribe( res => {
            this.location_history = res.data
            this.location_ids = []
            for(let key in this.location_history) {
              if(this.location_history[key].Hardware_Inventory == this.f_location.Hardware_Inventory.value)
                this.location_ids.push(key)
            }
          });
      }  
      else
        this.oshaService.error_alert = res['message']
      this.loading_submit = false
      this.submitted = false
    })
  }

  remove__c(string){
    return string.trim().replace(/\__c/gi, "");
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
      return `${control_name} is required!`
    }
  }
  make_keys(item_name){
    let _keys: Array<string> = []
    for(var key in this.references[item_name].data) {
      _keys.push(key)
    }
    return _keys
  }
  make_picklist(string){
    return string.split('||')
  }

  get_field_type(string){
    for(let item of this.insert_display_order){
      if(string == this.remove__c(item.name)){
        return item.type
      }
    }
    return ''
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)
  }
}
