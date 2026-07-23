import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseDetailModel, PurchaseDetailService } from '../../models/purchesDetail';
import { ProductModel } from '../../models/product';
import { purchesModel } from '../../models/purches';


@Component({
  selector: 'app-purches-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purches-detail.html',
  styleUrl: './purches-detail.scss'
})
export class PurchesDetail implements OnInit {

  private detailService = inject(PurchaseDetailService);

  // ড্রপডাউন ও টেবিল ডাটার সিগন্যাল
  products = signal<ProductModel[]>([]);
  purchases = signal<purchesModel[]>([]);
  detailsList = signal<PurchaseDetailModel[]>([]);

  // ফর্মে ইনপুট নেওয়ার সিগন্যাল
  purchaseId = signal<number | null>(null);
  productId = signal<number | null>(null);
  quantity = signal<number | null>(null);
  unitPrice = signal<number | null>(null);

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
   
    this.detailService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error loading products:', err)
    });

 
    this.detailService.getPurchases().subscribe({
      next: (data) => this.purchases.set(data),
      error: (err) => console.error('Error loading purchases:', err)
    });

   
    this.loadAllDetails();
  }

  loadAllDetails() {
    this.detailService.getAllDetails().subscribe({
      next: (data) => this.detailsList.set(data),
      error: (err) => console.error('Error loading details list:', err)
    });
  }

  onSubmit() {
    if (!this.purchaseId() || !this.productId() || !this.quantity() || !this.unitPrice()) {
      alert('দয়া করে সবগুলো ঘর সঠিকভাবে পূরণ করুন!');
      return;
    }

   
    const payload: PurchaseDetailModel = {
      purchase: { id: Number(this.purchaseId()) },
      product: { id: Number(this.productId()) },
      quantity: Number(this.quantity()),
      unitPrice: Number(this.unitPrice())
    };

    this.detailService.saveDetail(payload).subscribe({
      next: (res) => {
        alert('Purchase Detail সফলভাবে সেভ হয়েছে!');
        this.resetForm();
        this.loadAllDetails(); 
      },
      error: (err) => {
        console.error('Save error:', err);
        alert('সেভ করতে সমস্যা হয়েছে!');
      }
    });
  }

  onDelete(id: number | undefined) {
    if (!id) return;
    if (confirm('আপনি কি সত্যিই এটি ডিলিট করতে চান?')) {
      this.detailService.deleteDetail(id).subscribe({
        next: (msg) => {
          alert(msg);
          this.loadAllDetails(); 
        },
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  resetForm() {
    this.purchaseId.set(null);
    this.productId.set(null);
    this.quantity.set(null);
    this.unitPrice.set(null);
  }
}