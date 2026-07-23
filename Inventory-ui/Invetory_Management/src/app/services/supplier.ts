import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierModel } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  
  private baseUrl = 'http://localhost:8080/suppliers';

  constructor(private http: HttpClient) {}

  save(supplier: SupplierModel): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(this.baseUrl, supplier);
  }

  getAll(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<SupplierModel> {
    return this.http.get<SupplierModel>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  update(id: number, supplier: SupplierModel): Observable<SupplierModel> {
    supplier.id = id;
    return this.http.post<SupplierModel>(this.baseUrl, supplier);
  }
}