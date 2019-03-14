import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';

import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  constructor(private router: Router, private authenticationService: AuthenticationService, @Inject(DOCUMENT) _document?: any) {

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

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
