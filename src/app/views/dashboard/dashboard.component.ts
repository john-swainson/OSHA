import { Component, OnInit } from '@angular/core';
import { AlertService, OshaService } from '../../_services';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { dashboardItems } from '../../_dashboard';

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
  // Dashboard Kind
  public current_dashboard_type = 'OSHA'; // default OSHA
  public dashboardItems = dashboardItems;
  public org_name: string = '';

  constructor(private alertService: AlertService, private oshaService: OshaService) {
    
    let org_words = localStorage.getItem('org_name').split(' ');
    let temp_org = '';
    for(let word of org_words)
    {
      temp_org += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    }
    this.org_name = temp_org;

    this.oshaService.current_dashboard_type.subscribe(
      (type) => {
        this.current_dashboard_type = type;
        if(type.length > 0){
          this.doDashboard();
        }
        
      }
    );
  }

  ngOnInit(): void {
   
  }

  doDashboard(){
    let index = 0;
    for(var item of this.dashboardItems[this.current_dashboard_type]) {
      let api_url = item.url.replace(/\_/gi, "-");
      //Exception
      if(api_url == '/hipaa-contact'){
        api_url = 'contact';
      }
      item.isloading = true;
      
      this.oshaService.get_objects(api_url, index, this.current_dashboard_type).subscribe(res => {
       
        this.dashboardItems[res.type][res.index].isloading = false;
        // Integer
        if(this.dashboardItems[res.type][res.index].type == 'integer'){
  
          let message = res.message;
          this.dashboardItems[res.type][res.index].data = message.split(' ')[0];
        }
        // Date
        else if(this.dashboardItems[res.type][res.index].type == 'date'){
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
          this.dashboardItems[res.type][res.index].data = date;
        }
      },
      err=>{
        console.log(err);
      })
      index++;
    }
  }
}
