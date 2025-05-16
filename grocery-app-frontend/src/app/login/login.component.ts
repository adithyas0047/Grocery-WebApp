// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Add RouterLink here
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add RouterLink to imports
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.css`]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(): void {
    this.formSubmitted = true;
    
    // Check if username or password is empty
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/grocery-list']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
