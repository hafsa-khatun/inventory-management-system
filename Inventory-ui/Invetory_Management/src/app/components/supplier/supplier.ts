import { Component, OnInit, signal } from '@angular/core';
import { SupplierModel } from '../../models/supplier';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './supplier.html',
  styleUrls: ['./supplier.scss']
})
export class Supplier implements OnInit {

  // Signals State Management
  supplierList = signal<SupplierModel[]>([]);
  supplier = signal<SupplierModel>({ supplierName: '', phone: '', email: '', address: '' });
  
  isEditMode = signal<boolean>(false);
  editId = signal<number | null>(null);
  
  message = signal<string>('');
  isError = signal<boolean>(false);
  showForm = signal<boolean>(false);

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => this.supplierList.set(data),
      error: () => this.showMsg('Failed to load suppliers data', true)
    });
  }

  toggleForm(): void {
    this.showForm.update(val => !val);
    if (!this.showForm()) this.resetForm();
  }

  onSubmit(): void {
    const currentData = this.supplier();
    if (!currentData.supplierName.trim()) {
      this.showMsg('Supplier Name is required', true);
      return;
    }

    if (this.isEditMode() && this.editId()) {
      this.supplierService.update(this.editId()!, currentData).subscribe({
        next: () => {
          this.showMsg('Supplier updated successfully');
          this.resetForm();
          this.loadAll();
        },
        error: () => this.showMsg('Failed to update supplier', true)
      });
    } else {
      this.supplierService.save(currentData).subscribe({
        next: () => {
          this.showMsg('Supplier saved successfully');
          this.resetForm();
          this.loadAll();
        },
        error: () => this.showMsg('Failed to save supplier', true)
      });
    }
  }

  onEdit(item: SupplierModel): void {
    this.isEditMode.set(true);
    this.editId.set(item.id!);
    this.supplier.set({ 
      supplierName: item.supplierName, 
      phone: item.phone, 
      email: item.email, 
      address: item.address 
    });
    this.showForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    
    this.supplierService.delete(id).subscribe({
      next: (response) => {
        // Signals filtering inline (No reload blink)
        this.supplierList.update(list => list.filter(item => item.id !== id));
        this.showMsg(response || 'Supplier deleted successfully');
      },
      error: () => this.showMsg('Delete failed. Code constraints occurred.', true)
    });
  }

  resetForm(): void {
    this.supplier.set({ supplierName: '', phone: '', email: '', address: '' });
    this.isEditMode.set(false);
    this.editId.set(null);
    this.showForm.set(false);
  }

  showMsg(msg: string, errorStatus = false): void {
    this.message.set(msg);
    this.isError.set(errorStatus);
    setTimeout(() => this.message.set(''), 3000);
  }
}