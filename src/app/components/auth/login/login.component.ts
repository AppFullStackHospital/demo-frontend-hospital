import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Jwtclient } from '../../../common/jwtclient';
import { Userdto } from '../../../common/userdto';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  icoEnterprise = faHeartPulse;

  ngOnInit(): void { }

  constructor(
    private authenticationService: AuthenticationService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login() {
    this.isLoading = true;
    let userDto = new Userdto(this.username, this.password);
    this.authenticationService.login(userDto).subscribe(
      (jwtClient: Jwtclient) => {
        console.log('Login response: ', jwtClient);
        this.sessionStorage.setItem('token', jwtClient);
        this.sessionStorage.setItem('firstName', jwtClient.name);
        if (jwtClient.type === 'ADMIN') {
          this.toastr.success(`Bienvenido ${jwtClient.name}`, 'Login exitoso');
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/not-authorized']);
        }
        this.isLoading = false;
      },
      (error) => {
        console.log('Login error: ', error);
        this.toastr.error('Correo o contraseña incorrectos, por favor intentelo nuevamente', 'Error');
        this.isLoading = false;
      }
    );
  }
}
