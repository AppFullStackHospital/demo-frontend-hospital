import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit(): void {
    console.log('LogoutComponent: ' + this.sessionStorage.getItem('token'));
    this.sessionStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
