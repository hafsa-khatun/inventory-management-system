import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}

 
  login(email: string, password: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl).pipe(
      tap(users => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
        } else {
          throw new Error('Invalid Email or Password!');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}