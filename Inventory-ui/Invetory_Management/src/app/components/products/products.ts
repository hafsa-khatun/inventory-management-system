import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatagoriService } from '../../services/catagori'; 
import { SupplierService } from '../../services/supplier'; 
import { CatagoryModel, ProductModel } from '../../models/product';
import { CatagoriModel } from '../../models/catagori';
import { SupplierModel } from '../../models/supplier';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductComponent implements OnInit {
  // State Management via Signals
  productList = signal<ProductModel[]>([]);
  categories = signal<CatagoriModel[]>([]); 
  suppliers = signal<SupplierModel[]>([]);   

  // Form Fields Signals
  productName = signal<string>('');
  description = signal<string>('');
  price = signal<number | null>(null);
  quantity = signal<number | null>(null);
  selectedCategory = signal<CatagoryModel | null>(null);
  selectedSupplier = signal<SupplierModel | null>(null);

  // UI State Signals
  message = signal<string>('');
  isError = signal<boolean>(false);
  showForm = signal<boolean>(false);

 
  constructor(
    private productService: ProductService,
    private catagoriService: CatagoriService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories(); 
    this.loadSuppliers();  
  }

  
  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.productList.set(data),
      error: () => this.showMsg('Failed to load products', true)
    });
  }

 
  loadCategories(): void {
    this.catagoriService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.showMsg('Failed to load categories', true)
    });
  }

  
  loadSuppliers(): void {
    this.supplierService.getAll().subscribe({
      next: (data) => this.suppliers.set(data),
      error: () => this.showMsg('Failed to load suppliers', true)
    });
  }

  toggleForm(): void {
    this.showForm.update(val => !val);
    if (!this.showForm()) this.resetForm();
  }

  onSubmit(): void {
    const nameVal = this.productName().trim();
    if (!nameVal || this.price() === null || this.quantity() === null) {
      this.showMsg('Please fill all required fields', true);
      return;
    }

    const payload: ProductModel = {
      productName: nameVal,
      description: this.description(),
      price: this.price()!,
      quantity: this.quantity()!,
      category: this.selectedCategory(),
      supplier: this.selectedSupplier()
    };

    this.productService.save(payload).subscribe({
      next: () => {
        this.showMsg('Product saved successfully');
        this.resetForm();
        this.loadProducts();
      },
      error: () => this.showMsg('Failed to save product', true)
    });
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(id).subscribe({
      next: (res) => {
        this.productList.update(list => list.filter(p => p.id !== id));
        this.showMsg(res || 'Product deleted successfully');
      },
      error: () => this.showMsg('Delete failed', true)
    });
  }

  resetForm(): void {
    this.productName.set('');
    this.description.set('');
    this.price.set(null);
    this.quantity.set(null);
    this.selectedCategory.set(null);
    this.selectedSupplier.set(null);
    this.showForm.set(false);
  }

  showMsg(msg: string, errorStatus = false): void {
    this.message.set(msg);
    this.isError.set(errorStatus);
    setTimeout(() => this.message.set(''), 3000);
  }


  compareFn(item1: any, item2: any): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }
}