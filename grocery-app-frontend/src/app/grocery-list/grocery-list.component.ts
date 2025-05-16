// src/app/grocery-list/grocery-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

interface GroceryItem {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./grocery-list.component.html`,
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  groceryItems: GroceryItem[] = [];
  newItem: { name: string, price: number } = { name: '', price: 0 };
  errorMessage: string = '';
  username: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadGroceryItems();
    this.username = this.apiService.getUserName();
  }

  loadGroceryItems(): void {
    this.apiService.getGroceryItems().subscribe({
      next: (items) => {
        this.groceryItems = items;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching grocery items:', error);
        this.errorMessage = 'Unable to load your grocery items';
      }
    });
  }

  addItem(): void {
    if (!this.newItem.name || this.newItem.price <= 0) {
      this.errorMessage = 'Please provide a valid item name and price';
      return;
    }
    
    this.apiService.addGroceryItem(this.newItem.name, this.newItem.price).subscribe({
      next: (response) => {
        this.groceryItems.push(response);
        this.newItem = { name: '', price: 0 };
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error adding item:', error);
        this.errorMessage = 'Failed to add item';
      }
    });
  }

  deleteItem(id: number): void {
    this.apiService.deleteGroceryItem(id).subscribe({
      next: () => {
        this.groceryItems = this.groceryItems.filter(item => item.id !== id);
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error deleting item:', error);
        this.errorMessage = 'Failed to delete item';
      }
    });
  }

  calculateTotal(): number {
    return this.groceryItems.reduce((sum, item) => sum + item.price, 0);
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
