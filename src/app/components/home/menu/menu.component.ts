import { Component, OnInit } from '@angular/core';
import {
  faList,
  faChevronRight,
  faPlus,
  faPen,
  faTrash,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  icoList = faList;
  icoFlechaDerecha = faChevronRight;
  icoAdd = faPlus;
  icoUpdate = faPen;
  icoDelete = faTrash;
  icoPowerOff = faPowerOff;
  isLoggedIn: boolean = false;

  constructor(
    private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    const token = this.sessionStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
