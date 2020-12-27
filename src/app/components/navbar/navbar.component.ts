import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  authUrl = `${CONFIG.cas_auth_url}?service=${CONFIG.service_url}`;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn;
    this.isAdmin = this.auth.isAdmin;
  }

  logout() {
    this.auth.logout().then(() => window.location.href = 'https://idp.rice.edu/idp/profile/cas/logout');
  }

  /**
   * Checks if user is viewing the transactions window
   */
  viewingTransactions() {
    return this.router.url.includes('transactions')
  }
}
