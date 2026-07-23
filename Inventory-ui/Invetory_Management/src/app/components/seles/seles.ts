import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../../services/sale';
import { SaleModel } from '../../models/sale';
import { CustomerModel } from '../../models/customer';

@Component({
  selector: 'app-seles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seles.html',
  styleUrl: './seles.scss',
})
export class Seles implements OnInit {
  private service = inject(SaleService);

  // Signal State
  salesList = signal<SaleModel[]>([]);
  customers = signal<CustomerModel[]>([]);

  // Form Signals
  selectedCustomerId = signal<number | null>(null);
  totalAmount = signal<number | null>(null);

  ngOnInit(): void {
    this.loadSales();
    this.loadCustomers();
  }

  loadSales(): void {
    this.service.getAll().subscribe({
      next: (data) => this.salesList.set(data),
      error: (err) => console.error('Error fetching sales:', err)
    });
  }

  loadCustomers(): void {
    this.service.getCustomers().subscribe({
      next: (data) => {
        console.log('Customers Response:', data); 
        this.customers.set(data);
      },
      error: (err) => console.error('Error fetching customers:', err)
    });
  }

  onSubmit(): void {
    if (!this.selectedCustomerId() || !this.totalAmount()) {
      alert('Select a valid customer and amount!');
      return;
    }

    const payload: SaleModel = {
      customer: { id: Number(this.selectedCustomerId()) },
      totalAmount: this.totalAmount()!
    };

    this.service.save(payload).subscribe({
      next: () => {
        this.loadSales();
        this.resetForm();
      },
      error: (err) => console.error('Error saving sale:', err)
    });
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (confirm('Do you want to delete this sales record?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadSales(),
        error: (err) => console.error('Error deleting sale:', err)
      });
    }
  }

  resetForm(): void {
    this.selectedCustomerId.set(null);
    this.totalAmount.set(null);
  }
}