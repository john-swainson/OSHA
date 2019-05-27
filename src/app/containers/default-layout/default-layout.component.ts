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
    this.oshaService.generate_breadcrumb()
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
