import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleDetailModel } from '../models/saleDetailModel';
import { SaleModel } from '../models/sale';
import { ProductModel } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class SaleDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/sale-details'; 

  getAll(): Observable<SaleDetailModel[]> {
    return this.http.get<SaleDetailModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<SaleDetailModel> {
    return this.http.get<SaleDetailModel>(`${this.apiUrl}/${id}`);
  }

  save(detail: SaleDetailModel): Observable<SaleDetailModel> {
    return this.http.post<SaleDetailModel>(this.apiUrl, detail);
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

 
  getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>('http://localhost:8080/sales');
  }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:8080/products');
  }
}