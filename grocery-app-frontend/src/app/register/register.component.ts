// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Add RouterLink here
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add RouterLink to imports
  templateUrl: `./register.component.html`,
  styleUrls: [`./register.component.css`],
})
export class RegisterComponent {
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
    this.apiService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error?.error || 'Registration failed';
      }
    });
  }
}
