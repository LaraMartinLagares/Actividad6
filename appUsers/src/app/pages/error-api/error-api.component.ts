import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-api',
  standalone: true,
  imports: [],
  templateUrl: './error-api.component.html',
  styleUrl: './error-api.component.css'
})
export class ErrorAPIComponent {

  route = inject(Router);

  goHome(): void{
    this.route.navigate(['/home']);
  }

}