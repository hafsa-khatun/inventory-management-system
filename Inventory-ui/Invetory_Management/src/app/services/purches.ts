import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { purchesModel } from '../models/purches';
import { Supplier } from '../components/supplier/supplier';


@Injectable({
  providedIn: 'root'
})
export class PurchesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/purchases'; 
  private supplierApiUrl = 'http://localhost:8080/suppliers'; 

  #purchasesState = signal<purchesModel[]>([]);
  purchases = computed(() => this.#purchasesState());

  totalPurchaseAmount = computed(() => 
    this.#purchasesState().reduce((sum, p) => sum + (p.totalAmount || 0), 0)
  );


  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.supplierApiUrl);
  }

  getAllPurchases(): Observable<purchesModel[]> {
    return this.http.get<purchesModel[]>(this.apiUrl).pipe(
      tap(data => this.#purchasesState.set(data))
    );
  }

  savePurchase(purchase: purchesModel): Observable<purchesModel> {
    return this.http.post<purchesModel>(this.apiUrl, purchase).pipe(
      tap(newPurchase => {
        this.#purchasesState.update(current => [...current, newPurchase]);
      })
    );
  }

  deletePurchase(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(() => {
        this.#purchasesState.update(current => current.filter(p => p.id !== id));
      })
    );
  }
}