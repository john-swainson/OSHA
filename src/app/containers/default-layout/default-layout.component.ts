import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthenticationService, OshaService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  //Dashboard
  public dashboard_switch=['OSHA', 'HIPAA', 'PCI'];
  public current_dashboard_type = 'OSHA'; // default OSHA

  constructor(private router: Router, private authenticationService: AuthenticationService, private oshaService: OshaService
    , @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(){
    this.setBoardType();
    this.addLogout();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  setBoardType(){
    this.oshaService.current_dashboard_type_subject.next(this.current_dashboard_type);
    this.navItems = navItems[this.current_dashboard_type];  
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
                                badge: { variant: 'danger', text: 'OUT' } } 
      );
    }
  }
  onChange(val){
    this.current_dashboard_type = val;
    this.setBoardType();
    this.addLogout();
    this.router.navigateByUrl('/dashboard');
  }
}
