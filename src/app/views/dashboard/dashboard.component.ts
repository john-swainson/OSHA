import { Component, OnInit } from '@angular/core';
import { AlertService, OshaService } from '../../_services';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Pie
  public pieChartLabels: string[] = ['# of BAs', '# of BAs'];
  public pieChartData: number[] = [300, 500];
  public pieChartType = 'pie';
  
  // Doughnut
  public doughnutChartLabels: string[] = ['# of BAs', '# of BAs'];
  public doughnutChartData: number[] = [350, 450];
  public doughnutChartType = 'doughnut';
  // Object urls
  number_object_url = { 'ic_post_exposure_management':{isloading: false, number: -1}, 
                        'ic_preventing_transmission':{isloading: false, number: -1}, 
                        'ic_engineering_controls':{isloading: false, number: -1}, 
                        'ic_contact_dermatitis':{isloading: false, number: -1}, 
                        'ic_records_maintenance':{isloading: false, number: -1},
                        'facility':{isloading: false, number: -1}, 
                        'contact':{isloading: false, number: -1}, 
                        'safety_data_sheet':{isloading: false, number: -1} 
                      };

  date_object_url = { 
                      'ic_instrument_processing':{isloading: false, date: -1}, 
                      'ic_work_practice':{isloading: false, date: -1}, 
                      'ic_prep_packaging':{isloading: false, date: -1}, 
                      'ic_unwrapped_instruments':{isloading: false, date: -1}, 
                      'ic_implantable_devices':{isloading: false, date: -1},
                      'ic_sterilization_monitoring':{isloading: false, date: -1}, 
                      'ic_sterilization_disinfection':{isloading: false, date: -1}, 
                      'ic_managing_surfaces':{isloading: false, date: -1}, 
                      'ic_regulated_waste':{isloading: false, date: -1}, 
                      'ic_extracted_teeth':{isloading: false, date: -1},
                      'ic_dental_quality':{isloading: false, date: -1}, 
                      'ic_dental_airwaterlines':{isloading: false, date: -1}, 
                      'ic_radiography':{isloading: false, date: -1}, 
                      'ic_digital_radiography':{isloading: false, date: -1},
                    };
  public facility_info: number = 0;
  constructor(private alertService: AlertService, private oshaService: OshaService) {

  }
  ngOnInit(): void {

    for(var key in this.number_object_url) {
      let api_url = key.replace(/\_/gi, "-");
      this.number_object_url[key].isloading = true;
      
      this.oshaService.get_objects(api_url, key).subscribe(res => {
        console.log(res);
        this.number_object_url[res.key].isloading = false;
        let message = res.message;
        this.number_object_url[res.key].number = message.split(' ')[0];
      },
      err=>{
        console.log(err);
      })
    }

    for(var key in this.date_object_url) {
      let api_url = key.replace(/\_/gi, "-");
      this.date_object_url[key].isloading = true;
      
      this.oshaService.get_objects(api_url, key).subscribe(res => {
        this.date_object_url[res.key].isloading = false;

        var date='1945-05-09';
        // Review_Date
        for(var key in res.data) {
          if( new Date(date).valueOf() < new Date(res.data[key].Review_Date).valueOf() )
          {
            date = res.data[key].Review_Date;
          }
        }
        if(res.data.length == 0)
          date = '';
        this.date_object_url[res.key].date = date;
      },
      err=>{
        console.log(err);
      })
    }
  }
}
