import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerModel } from '../../models/customer';
import { CustomerService } from '../../services/customer';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrls: ['./customer.scss']
})
export class CustomerComponent implements OnInit {
  // States Management via Signals
  customerList = signal<CustomerModel[]>([]);

  // Form Input Fields Signals
  customerName = signal<string>('');
  phone = signal<string>('');
  email = signal<string>('');
  address = signal<string>('');

  // Edit Mode Signals
  isEditMode = signal<boolean>(false);
  editId = signal<number | null>(null);

  // UI Flow Control Signals
  message = signal<string>('');
  isError = signal<boolean>(false);
  showForm = signal<boolean>(false);

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => this.customerList.set(data),
      error: () => this.showMsg('Failed to load customers', true)
    });
  }

  toggleForm(): void {
    this.showForm.update(val => !val);
    if (!this.showForm()) this.resetForm();
  }

  onSubmit(): void {
    const nameVal = this.customerName().trim();
    if (!nameVal) {
      this.showMsg('Customer name is required', true);
      return;
    }

    
    const payload: CustomerModel = {
      customerName: nameVal,
      phone: this.phone().trim(),
      email: this.email().trim(),
      address: this.address().trim()
    };

    if (this.isEditMode() && this.editId() !== null) {
      payload.id = this.editId()!;
    }

  
    this.customerService.save(payload).subscribe({
      next: () => {
        this.showMsg(this.isEditMode() ? 'Customer updated successfully' : 'Customer saved successfully');
        this.resetForm();
        this.loadCustomers();
      },
      error: () => this.showMsg('Failed to save customer', true)
    });
  }

  onEdit(item: CustomerModel): void {
    this.isEditMode.set(true);
    this.editId.set(item.id ?? null);

  
    this.customerName.set(item.customerName);
    this.phone.set(item.phone || '');
    this.email.set(item.email || '');
    this.address.set(item.address || '');

    this.showForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customerService.delete(id).subscribe({
      next: (res) => {
        this.customerList.update(list => list.filter(c => c.id !== id));
        this.showMsg(res || 'Customer deleted successfully');
      },
      error: () => this.showMsg('Delete failed', true)
    });
  }

  resetForm(): void {
    this.customerName.set('');
    this.phone.set('');
    this.email.set('');
    this.address.set('');
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