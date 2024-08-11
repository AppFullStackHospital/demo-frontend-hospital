import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Jwtclient } from '../../../common/jwtclient';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  icoHome = faHome;
  icoDoor = faRightFromBracket;
  jwtClient: Jwtclient = new Jwtclient(
    this.sessionStorage.getItem('token').id,
    this.sessionStorage.getItem('token').token,
    this.sessionStorage.getItem('token').type,
    this.sessionStorage.getItem('token').name
  );

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService) { }

}
