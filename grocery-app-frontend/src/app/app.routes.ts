// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/grocery-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: '**', redirectTo: '/login' }
];
