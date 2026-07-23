import { Component, inject, OnInit, signal } from '@angular/core';
import { PurchesService } from '../../services/purches';
import { purchesModel } from '../../models/purches';


import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierModel } from '../../models/supplier';

@Component({
  selector: 'app-purches',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purches.html',
  styleUrl: './purches.scss',
})
export class Purches implements OnInit {
  private purchesService = inject(PurchesService);

  supplierId = signal<number | null>(null);
  totalAmount = signal<number | null>(null);

 
  suppliers = signal<SupplierModel[]>([]);

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.purchesService.getAllSuppliers().subscribe({
      next: (data: any) => {
        this.suppliers.set(data); 
      },
      error: (err) => console.error('Error loading suppliers:', err)
    });
  }

  onSubmit() {
    if (!this.supplierId() || !this.totalAmount()) {
      alert('Please fill all required fields');
      return;
    }

    const selectedSupplierId = Number(this.supplierId());
    

    const selectedSupplier = this.suppliers().find((s: SupplierModel) => s.id === selectedSupplierId);

    if (!selectedSupplier) {
      alert('Selected supplier not found!');
      return;
    }


    const newPurchase: purchesModel = {
      supplier: {
        id: selectedSupplier.id!,
        name: selectedSupplier.supplierName 
      },
      totalAmount: Number(this.totalAmount())
    };

    this.purchesService.savePurchase(newPurchase).subscribe({
      next: (response) => {
        this.supplierId.set(null);
        this.totalAmount.set(null);
        alert('Purchase recorded successfully!');
      },
      error: (err) => {
        console.error('Submission failed:', err);
        alert('Failed to save purchase record.');
      }
    });
  }
}