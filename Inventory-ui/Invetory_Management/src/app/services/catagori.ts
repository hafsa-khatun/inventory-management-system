import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatagoriModel } from '../models/catagori';

@Injectable({ providedIn: 'root' })
export class CatagoriService {

  private apiUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CatagoriModel[]> {
    return this.http.get<CatagoriModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<CatagoriModel> {
    return this.http.get<CatagoriModel>(`${this.apiUrl}/${id}`);
  }

  save(catagori: CatagoriModel): Observable<CatagoriModel> {
    return this.http.post<CatagoriModel>(this.apiUrl, catagori);
  }

  // আপডেট মেথডটি নিরাপদ করা হলো
  update(id: number, catagori: CatagoriModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, catagori, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}