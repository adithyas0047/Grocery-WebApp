import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroceryItem } from './models/grocery-item.model';
import { AppUser } from './models/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private baseUrl = 'http://localhost:8080/'; // Adjust if your backend uses a different port

  constructor(private http: HttpClient) { }

  // Authentication methods
  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(`${this.baseUrl}/login`, formData, { withCredentials: true });
  }

  register(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(`${this.baseUrl}/register`, formData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  // Grocery item methods
  getGroceryItems(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(`${this.baseUrl}/grocery-items`, { withCredentials: true });
  }

  addGroceryItem(item: GroceryItem): Observable<GroceryItem> {
    return this.http.post<GroceryItem>(`${this.baseUrl}/grocery-items`, item, { withCredentials: true });
  }

  deleteGroceryItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/grocery-items/${id}`, { withCredentials: true });
  }
}
