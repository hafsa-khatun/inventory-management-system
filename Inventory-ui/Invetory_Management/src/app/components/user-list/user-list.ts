import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user';
import { UserService } from '../../services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit{
users: UserModel[] = [];
  currentUser: UserModel = { name: '', email: '', password: '', role: 'ADMIN' };
  isEditMode = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  submitForm(): void {
  if (this.isEditMode && this.currentUser.id) {
   
    const updateData = { ...this.currentUser };
    if (!updateData.password) {
      delete updateData.password;
    }
    
    this.userService.updateUser(this.currentUser.id, updateData).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
      },
      error: (err: HttpErrorResponse) => console.error('Update error:', err)
    });
  } else {
    this.userService.saveUser(this.currentUser).subscribe({
      next: () => {
        this.resetForm();
        this.loadUsers();
      },
      error: (err) => console.error('Save error:', err)
    });
  }
}

  editUser(user: UserModel): void {
    this.currentUser = { ...user };
    this.isEditMode = true;
  }

  deleteUser(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm(): void {
    this.currentUser = { name: '', email: '', password: '', role: 'ADMIN' };
    this.isEditMode = false;
  }
}
