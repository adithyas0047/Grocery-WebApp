// api.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  private userId: number | null = null;
  private username: string = '';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    // Try to load userId and username from localStorage if in browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = parseInt(storedUserId, 10);
      }
      
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        this.username = storedUsername;
      }
    }
  }
  
  // Add a getter for username
  getUserName(): string {
    return this.username;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((response: any) => {
        this.userId = response.userId;
        this.username = username; // Store the username
        
        // Only access localStorage in browser environment
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('userId', this.userId?.toString() || '');
          localStorage.setItem('username', username); // Store the username in localStorage
        }
      }));
  }


  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password });
  }

  getGroceryItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items?userId=${this.userId}`);
  }

  addGroceryItem(name: string, price: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/items`, {
      name,
      price,
      userId: this.userId
    });
  }

  deleteGroceryItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/items/${itemId}?userId=${this.userId}`);
  }

  logout(): void {
    this.userId = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return this.userId !== null;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
