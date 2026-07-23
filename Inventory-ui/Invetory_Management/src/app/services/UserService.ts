import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/users';

  // ১. সব ইউজার গেট করা
  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  // ২. নির্দিষ্ট ইউজার গেট করা
  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  // ৩. নতুন ইউজার সেভ করা (POST)
  saveUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  // 🎯 ৪. ইউজার আপডেট করার মেথড (PUT: /api/users/{id})
  // ⚠️ এই মেথডটি যোগ না করার কারণেই TS2339 এররটি আসছিল
  updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${id}`, user);
  }

  // ৫. ইউজার ডিলিট করা (DELETE: /api/users/{id})
  deleteUser(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // ৬. ইমেইল ও পাসওয়ার্ড মিলিয়ে লগইন
  login(email: string, password: string): Observable<UserModel | null> {
    return this.getAllUsers().pipe(
      map((users: UserModel[]) => {
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );
        if (foundUser) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
          return foundUser;
        }
        return null;
      })
    );
  }

  getCurrentUser(): UserModel | null {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    sessionStorage.removeItem('loggedInUser');
  }
}