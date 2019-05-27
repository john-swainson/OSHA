import { Component, OnInit } from '@angular/core';
import { AlertService, OshaService, DashboardService, EnterpriseService } from '../../_services';
import { dashboardItems } from '../../_dashboard';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: 'enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  // Enterprise Totals
  public force_totals: any = []
  public force_children: any = null
  public child_org_id:String = ''
  public selected_total: String = ''
  public is_loading = false

  public dtOptions: any = {};

  constructor(private alertService: AlertService, private oshaService: OshaService, 
              public dashboardService: DashboardService, public enterpriseService: EnterpriseService,
              private route:ActivatedRoute, private router:Router) {

    //=== Get child organziation id ===
    this.selected_total = this.enterpriseService.total_fields[0];
    route.queryParams.subscribe(params=>{
      if(params.hasOwnProperty('child'))
        this.child_org_id = params.child
      if(params.hasOwnProperty('field'))
        this.selected_total = params.field
    });
    //==================================
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false
    };
    
    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false
            window.scrollTo(0, 0)
        }
    });
  }

  ngOnInit(): void {
    this.is_loading = true;
    this.enterpriseService.get_parent_totals(this.child_org_id).subscribe( res=> {

        if(res.hasOwnProperty('data')){

          this.force_totals = res.data[0]
          
          this.enterpriseService.get_children_totals(this.child_org_id).subscribe( child_res => {
            if(child_res.hasOwnProperty('data')){
              this.force_children = child_res.data
              console.log(this.force_children)
            }
            this.is_loading = false;
          })
          console.log(this.force_totals)
        }
    });

    // Datatable configure
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      scrollY: '500',
    };
  }

  doDashboard(){
  
  }
  remove__c(string){
    return string.trim().replace(/\__c/gi, "")
  }
  replace_space(string){
    return string.replace(/\_/gi, " ")
  }
  remove_total(string){
    return string.replace(/\Total_/gi, "")
  }
  view_child(child_id){
    //
  }
}
