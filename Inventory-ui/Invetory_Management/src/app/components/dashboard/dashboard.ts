import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer, forkJoin, catchError, of, switchMap } from 'rxjs';
import { ProductService } from '../../services/product';
import { CatagoriService } from '../../services/catagori';
import { SupplierService } from '../../services/supplier';
import { SaleService } from '../../services/sale';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
 
  private productService = inject(ProductService);
  private categoryService = inject(CatagoriService);
  private supplierService = inject(SupplierService);
  private saleService = inject(SaleService);

  private autoRefreshSub?: Subscription;

  
  totalProducts = signal<number>(0);
  totalCategories = signal<number>(0);
  totalSuppliers = signal<number>(0);
  totalSalesCount = signal<number>(0);
  totalRevenue = signal<number>(0);
  recentSales = signal<any[]>([]);
  
  lastUpdated = signal<Date>(new Date());

  ngOnInit(): void {
    this.fetchDataAndAutoSync();
  }

  fetchDataAndAutoSync(): void {
   
    this.autoRefreshSub = timer(0, 5000)
      .pipe(
        switchMap(() => {
         
          return forkJoin({
            products: this.productService.getAll().pipe(catchError(err => { console.error('Product Error:', err); return of([]); })),
            categories: this.categoryService.getAll().pipe(catchError(err => { console.error('Category Error:', err); return of([]); })),
            suppliers: this.supplierService.getAll().pipe(catchError(err => { console.error('Supplier Error:', err); return of([]); })),
            sales: this.saleService.getAll().pipe(catchError(err => { console.error('Sales Error:', err); return of([]); }))
          });
        })
      )
      .subscribe((res: any) => {
        console.log('API Response Data:', res);

       
        const productList = Array.isArray(res.products) ? res.products : [];
        const categoryList = Array.isArray(res.categories) ? res.categories : [];
        const supplierList = Array.isArray(res.suppliers) ? res.suppliers : [];
        const salesList = Array.isArray(res.sales) ? res.sales : [];

       
        this.totalProducts.set(productList.length);
        this.totalCategories.set(categoryList.length);
        this.totalSuppliers.set(supplierList.length);
        this.totalSalesCount.set(salesList.length);

      
        const revenue = salesList.reduce((sum: number, sale: any) => {
          const price = Number(sale.totalAmount || sale.totalPrice || sale.grandTotal || sale.amount) || 0;
          return sum + price;
        }, 0);
        this.totalRevenue.set(revenue);

        
        this.recentSales.set([...salesList].reverse().slice(0, 5));

        this.lastUpdated.set(new Date());
      });
  }

  ngOnDestroy(): void {
    if (this.autoRefreshSub) {
      this.autoRefreshSub.unsubscribe();
    }
  }
}