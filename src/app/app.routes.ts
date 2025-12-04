import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'todo', component: AppComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
];
