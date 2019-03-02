import { Component, OnInit, ViewContainerRef, ViewChild, Inject } from '@angular/core';
import { AlertService, FacilityService } from '../../_services';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {

  is_loading: boolean;
  addForm: FormGroup;
  submitted: boolean;
  loading_submit: boolean;
  mode: number;
  index: string;

  constructor(private alertService: AlertService, public facilityService: FacilityService,
              config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder) {
      this.is_loading = true;
      this.submitted = false;
      this.loading_submit = false;
      this.mode = -1;
      this.index = '';

      this.addForm = this.formBuilder.group({
        Name_of_facility: ['', Validators.required],
        Active: ['', Validators.required],
        Address_Full: ['', Validators.required],
        City: ['', Validators.required],
        Number_of_staff: ['', Validators.required],
        Phone_number: ['', Validators.required],
        State: ['', Validators.required],
        Zip_Code: ['', Validators.required],
        Org_Facility: ['a0C550000001a0tEAA', Validators.required],
      });  
   }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }
    this.loading_submit = true;

    if(this.addForm.value['Active'] == true)
      this.addForm.get("Active").setValue(1);
    else
      this.addForm.get("Active").setValue(0);

    
    if(this.mode == 0)
    {
      let request_form = [{"id": "", "data": this.addForm.value}];
      this.facilityService.add_facility(request_form);
    }
    else if(this.mode == 2)
    {
      let request_form = [{"id": this.index, "data": { Name_of_facility: this.f.Name_of_facility.value, 
                                                      Active: this.f.Active.value,
                                                      Address_Full: this.f.Address_Full.value,
                                                      City: this.f.City.value,
                                                      Number_of_staff: this.f.Number_of_staff.value,
                                                      Phone_number: this.f.Phone_number.value,
                                                      State: this.f.State.value,
                                                      Zip_Code: this.f.Zip_Code.value }}];
      console.log(request_form);
      this.facilityService.update_facility(request_form);
    } 
    this.loading_submit = false;
    
  }

  delete(id){
    this.facilityService.delete_facility(id);
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
      this.set_values(index);
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
      this.f.Name_of_facility.setValue('');
      this.f.Address_Full.setValue('');
      this.f.City.setValue('');
      this.f.State.setValue('');
      this.f.Zip_Code.setValue('');
      this.f.Number_of_staff.setValue('');
      this.f.Active.setValue('');
      this.f.Phone_number.setValue('');
    }
    else
    {
      this.f.Name_of_facility.setValue(this.facilityService.facilites.data[index].Name_of_facility);
      this.f.Address_Full.setValue(this.facilityService.facilites.data[index].Address_Full);
      this.f.City.setValue(this.facilityService.facilites.data[index].City);
      this.f.State.setValue(this.facilityService.facilites.data[index].State);
      this.f.Zip_Code.setValue(this.facilityService.facilites.data[index].Zip_Code);
      this.f.Number_of_staff.setValue(this.facilityService.facilites.data[index].Number_of_staff);
      this.f.Active.setValue(this.facilityService.facilites.data[index].Active);
      this.f.Phone_number.setValue(this.facilityService.facilites.data[index].Phone_number);
    }
  }
}
