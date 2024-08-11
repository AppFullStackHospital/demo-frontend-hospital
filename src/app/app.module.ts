import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { authGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './components/crud/lista/lista.component';
import { AddComponent } from './components/crud/add/add.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'hospitals', component: ListaComponent, canActivate: [authGuard] },
  { path: 'register', component: AddComponent, canActivate: [authGuard] },
  { path: 'update', component: AddComponent, canActivate: [authGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    AddComponent,
    LoginComponent,
    MenuComponent,
    LogoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
