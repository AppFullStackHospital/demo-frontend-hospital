import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faRightFromBracket, faHeartPulse, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Jwtclient } from '../../../common/jwtclient';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  icoHome = faHome;
  icoDoor = faRightFromBracket;
  icoEnterprise = faHeartPulse;
  isLoggedIn: boolean = false;
  userName: string | null = null;
  isDropdownOpen: boolean = false;
  constructor(
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    const token = this.sessionStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.userName = token.name;
    } else {
      this.isLoggedIn = false;
      this.userName = null;
    }
  }
}
