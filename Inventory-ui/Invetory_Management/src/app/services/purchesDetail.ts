import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product';
import { purchesModel } from '../models/purches';

// 🎯 ইন্টারফেস আপডেট করা হলো
export interface PurchaseDetailModel {
  id?: number;
  purchase?: purchesModel | { id: number };
  product?: ProductModel | { id?: number; productName?: string };
  quantity: number;
  unitPrice: number;
  subtotal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/purchase-details';
  private productsUrl = 'http://localhost:8080/products';
  private purchasesUrl = 'http://localhost:8080/purchases';

  // 🎯 Save Purchase Detail (POST: /purchase-details)
  saveDetail(detail: PurchaseDetailModel): Observable<PurchaseDetailModel> {
    return this.http.post<PurchaseDetailModel>(this.baseUrl, detail);
  }

  // 🎯 Get All Purchase Details (GET: /purchase-details)
  getAllDetails(): Observable<PurchaseDetailModel[]> {
    return this.http.get<PurchaseDetailModel[]>(this.baseUrl);
  }

  // 🎯 Delete Purchase Detail (DELETE: /purchase-details/{id})
  deleteDetail(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // 🎯 Dropdown-এর জন্য
  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }

  getPurchases(): Observable<purchesModel[]> {
    return this.http.get<purchesModel[]>(this.purchasesUrl);
  }
}