import { Component, computed, inject, signal } from '@angular/core';
import { SaleDetailService } from '../../services/saleDetailService';
import { SaleDetailModel } from '../../models/saleDetailModel';
import { SaleModel } from '../../models/sale';
import { ProductModel } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seles-details',
  imports: [FormsModule,CommonModule],
  templateUrl: './seles-details.html',
  styleUrl: './seles-details.scss',
})
export class SelesDetails {
private service = inject(SaleDetailService);

  // Lists Signals
  saleDetailsList = signal<SaleDetailModel[]>([]);
  salesList = signal<SaleModel[]>([]);
  productList = signal<ProductModel[]>([]);

  // Form Signals
  selectedSaleId = signal<number | null>(null);
  selectedProductId = signal<number | null>(null);
  quantity = signal<number | null>(null);
  unitPrice = signal<number | null>(null);

  // Automatic Subtotal Calculation
  calculatedSubtotal = computed(() => {
    const q = this.quantity() || 0;
    const p = this.unitPrice() || 0;
    return q * p;
  });

  ngOnInit(): void {
    this.loadSaleDetails();
    this.loadDropdownData();
  }

  loadSaleDetails(): void {
    this.service.getAll().subscribe({
      next: (data) => this.saleDetailsList.set(data),
      error: (err) => console.error('Error fetching sale details:', err)
    });
  }

  loadDropdownData(): void {
    this.service.getSales().subscribe({
      next: (data) => this.salesList.set(data),
      error: (err) => console.error('Error fetching sales:', err)
    });

    this.service.getProducts().subscribe({
      next: (data) => this.productList.set(data),
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  onSubmit(): void {
    if (!this.selectedSaleId() || !this.selectedProductId() || !this.quantity() || !this.unitPrice()) {
      alert('সকল প্রয়োজনীয় তথ্য সঠিক ফিল্ডে প্রদান করুন!');
      return;
    }

    const payload: SaleDetailModel = {
      sale: { id: Number(this.selectedSaleId()) },
      product: { id: Number(this.selectedProductId()) },
      quantity: Number(this.quantity()),
      unitPrice: Number(this.unitPrice())
    };

    this.service.save(payload).subscribe({
      next: () => {
        this.loadSaleDetails();
        this.resetForm();
      },
      error: (err) => console.error('Error saving sale detail:', err)
    });
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (confirm('আপনি কি এই বিক্রয়ের ডিটেইল রেকর্ডটি মুছে ফেলতে চান?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadSaleDetails(),
        error: (err) => console.error('Error deleting sale detail:', err)
      });
    }
  }

  resetForm(): void {
    this.selectedSaleId.set(null);
    this.selectedProductId.set(null);
    this.quantity.set(null);
    this.unitPrice.set(null);
  }
}
