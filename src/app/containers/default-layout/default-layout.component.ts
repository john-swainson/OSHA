import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, OshaService, EnterpriseService } from '../../_services';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems
  public sidebarMinimized = true
  private changes: MutationObserver
  public element: HTMLElement

  // Dashboard Type
  public dashboard_switch=['OSHA', 'HIPAA', 'PCI']
  public current_dashboard_type; // default OSHA
  // BreadCrumbs
  public breadcrumbs: Array<{path: string, name: string, child: string}> = []

  constructor(private router: Router, private authenticationService: AuthenticationService, public oshaService: OshaService,
              private route:ActivatedRoute, public enterpriseService: EnterpriseService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    if(localStorage.getItem('dashboard') === null)
    {
      this.current_dashboard_type = 'OSHA'
    }
    else
    {
      this.current_dashboard_type = localStorage.getItem('dashboard');
    }
    var script = document.createElement('script')
    script.src = '/assets/js/resize.js'
    document.head.appendChild(script)

  }

  ngOnInit(){
    if(navItems.hasOwnProperty(this.current_dashboard_type))
    {
      this.setBoardType()
      this.addLogout()
    }
    //======== Adding Breadcrumbs from url ==============================================================
    this.oshaService.breadcrumbs = []
    this.oshaService.breadcrumbs.push({path: 'dashboard', name: 'Dashboard', child: ''})

    let urlTree = this.router.parseUrl(this.router.url)
    let main_path = urlTree.root.children['primary'].segments.map(it => it.path).join('/')
    
    if(main_path != 'enterprise' && main_path != 'dashboard'){
      this.oshaService.breadcrumbs.push({ path: main_path, name: main_path, child: ''})
    }
    else if(main_path == 'enterprise')
    {
      this.route.queryParams.subscribe(params=>{
        if(params.hasOwnProperty('child'))
        {
          // let child_id = params.child
          // let parent_id = localStorage.getItem('org_id')
          // this.enterpriseService.get_breadcrumb_path(child_id, parent_id).subscribe( data=> {
          //   let parent_list = data.reverse()
          //   for( let item of parent_list ){
          //     if(item.hasOwnProperty('Partner_Organization__r')){
          //       if(item.Partner_Organization__r.Id == localStorage.getItem('org_id'))
          //         this.oshaService.breadcrumbs.push({path: 'enterprise', name: item.Partner_Organization__r.Name, child: ''})
          //       else
          //         this.oshaService.breadcrumbs.push({path: 'enterprise', name: item.Partner_Organization__r.Name, child: item.Partner_Organization__r.Id})
          //     }
          //     else if(item.hasOwnProperty('Organization__r')){
          //       this.oshaService.breadcrumbs.push({path: 'enterprise', name: item.Organization__r.Name, child: item.Organization__r.Id})
          //     }
          //   }
          // },
          // err=>{
          //   if(err == "Bad Request"){
          //     this.router.navigateByUrl('/dashboard')
              
          //   }
          // })
          this.oshaService.breadcrumbs = []
          let bread = JSON.parse(localStorage.getItem('ent_breadcrumb'))
          let loop_id = params.child

          while(bread[loop_id].parent_id != ''){
            this.oshaService.breadcrumbs.push({path: 'enterprise', name: bread[loop_id].name, child: loop_id})
            loop_id = bread[loop_id].parent_id
          }
          this.oshaService.breadcrumbs.push({path: 'enterprise', name: localStorage.getItem('org_name'), child: ''})
          this.oshaService.breadcrumbs.push({path: 'dashboard', name: 'Dashboard', child: ''})
          this.oshaService.breadcrumbs.reverse()
        }
        else
        {
          this.oshaService.breadcrumbs.push({path: 'enterprise', name: localStorage.getItem('org_name'), child: ''})
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect()
  }
  logout() {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }
  setBoardType(){
    this.oshaService.current_dashboard_type_subject.next(this.current_dashboard_type)
    this.navItems = navItems[this.current_dashboard_type]
  }
  addLogout(){
    if(localStorage.getItem('currentUser') !== null )
    {
      for(let item of this.navItems){
        if(item.url == '/logout')
        {
          return;
        } 
      }
      this.navItems .unshift( { name: localStorage.getItem('contact_name'), 
                                url: '/logout', 
                                icon: 'icon-logout', 
                                badge: { variant: 'danger', text: 'LOGOUT' } } 
      );
    }
  }
  onChange(val){
    this.current_dashboard_type = val;
    if(navItems.hasOwnProperty(this.current_dashboard_type))
    {
      this.setBoardType();
      this.addLogout();
    }
    this.router.navigateByUrl('/dashboard');
    localStorage.setItem('dashboard', this.current_dashboard_type)
  }
  replace_space(string){
    return string.replace(/\_/gi, " ")
  }
  UpperName(string){

    let __string = this.replace_space(string)
    let array_words = __string.split(' ')
    let temp_org = ''
    for(let word of array_words)
    {
      temp_org += word.charAt(0).toUpperCase() + word.slice(1) + ' '
    }
    return temp_org
  }

  hello($event){
    console.log("heloo")
  }
}
