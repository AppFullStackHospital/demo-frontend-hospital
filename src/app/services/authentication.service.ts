import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable, map } from 'rxjs';
import { Userdto } from '../common/userdto';
import { Jwtclient } from '../common/jwtclient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api: string = 'http://localhost:8090/api/security/v1';

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.api}/register`, user);
  }

  login(userDto: Userdto): Observable<Jwtclient> {
    return this.httpClient.post<Jwtclient>(`${this.api}/login`, userDto);
  }

  getAllEmails(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.api}/verification/emails`);
  }

  checkEmailNotTaken(email: string): Observable<boolean> {
    return this.getAllEmails().pipe(
      map(emails => !emails.includes(email))
    );
  }
}
