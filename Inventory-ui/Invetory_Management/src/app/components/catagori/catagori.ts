import { Component, OnInit, signal } from '@angular/core';
import { CatagoriModel } from '../../models/catagori';
import { CatagoriService } from '../../services/catagori';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catagori',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './catagori.html',
  styleUrls: ['./catagori.scss']
})
export class Catagori implements OnInit {

  // Signals State Management
  catagoriList = signal<CatagoriModel[]>([]);
  
  
  categoryName = signal<string>('');
  description = signal<string>('');
  
  isEditMode = signal<boolean>(false);
  editId = signal<number | null>(null);
  
  message = signal<string>('');
  isError = signal<boolean>(false);
  showForm = signal<boolean>(false);

  constructor(private catagoriService: CatagoriService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.catagoriService.getAll().subscribe({
      next: (data) => this.catagoriList.set(data), 
      error: () => this.showMsg('Data load failed', true)
    });
  }

  toggleForm(): void {
    this.showForm.update(val => !val);
    if (!this.showForm()) this.resetForm();
  }

  onSubmit(): void {
    
    const nameVal = this.categoryName().trim();
    const descVal = this.description();

    if (!nameVal) {
      this.showMsg('Category name is required', true);
      return;
    }

    const payload: CatagoriModel = {
      categoryName: nameVal,
      description: descVal
    };

    if (this.isEditMode() && this.editId()) {
      this.catagoriService.update(this.editId()!, payload).subscribe({
        next: () => {
          this.showMsg('Category updated successfully');
          this.resetForm();
          this.loadAll();
        },
        error: () => this.showMsg('Failed to update category', true)
      });
    } else {
      this.catagoriService.save(payload).subscribe({
        next: () => {
          this.showMsg('Category saved successfully');
          this.resetForm();
          this.loadAll();
        },
        error: () => this.showMsg('Failed to save category', true)
      });
    }
  }

  onEdit(item: CatagoriModel): void {
    this.isEditMode.set(true);
    this.editId.set(item.id!);
    
   
    this.categoryName.set(item.categoryName);
    this.description.set(item.description || '');
    
    this.showForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    this.catagoriService.delete(id).subscribe({
      next: (response) => {
        this.catagoriList.update(list => list.filter(item => item.id !== id));
        this.showMsg(response || 'Category deleted successfully');
      },
      error: () => this.showMsg('Delete failed', true)
    });
  }

  resetForm(): void {
    this.categoryName.set('');
    this.description.set('');
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