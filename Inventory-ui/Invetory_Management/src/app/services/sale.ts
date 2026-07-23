import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleModel } from '../models/sale';
import { CustomerModel } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private http = inject(HttpClient);
  
  private baseUrl = 'http://localhost:8080/sales';
  private customersUrl = 'http://localhost:8080/customers'; // Customer ড্রপডাউনের জন্য

  // 🎯 POST: /sales
  save(sale: SaleModel): Observable<SaleModel> {
    return this.http.post<SaleModel>(this.baseUrl, sale);
  }

  // 🎯 GET: /sales
  getAll(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.baseUrl);
  }

  // 🎯 GET: /sales/{id}
  getById(id: number): Observable<SaleModel> {
    return this.http.get<SaleModel>(`${this.baseUrl}/${id}`);
  }

  // 🎯 DELETE: /sales/{id}
  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // 🎯 Dropdown-এ কাস্টমার লিস্ট দেখানোর জন্য
  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.customersUrl);
  }
}