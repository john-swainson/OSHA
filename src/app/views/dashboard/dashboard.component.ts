import { Component, OnInit } from '@angular/core';
import { AlertService, FacilityService } from '../../_services';
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

  public facility_info: number;
  constructor(private alertService: AlertService, private facilityService: FacilityService) {

  }
  ngOnInit(): void {
    this.facilityService.get_facilities().subscribe( res => {
      this.facility_info = Object.keys(res.data).length
    })
  }
}
