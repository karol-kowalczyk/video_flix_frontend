import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-email-address',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './email-address.component.html',
  styleUrls: ['./email-address.component.scss']
})
export class EmailAddressComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Bitte geben Sie eine E-Mail-Adresse ein.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.checkEmail(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'E-Mail Adresse ' + this.email + ' gefunden.';

        setTimeout(() => {
          this.successMessage = 'E-Mail mit dem Link zum Zurücksetzen des Passworts wurde an ' + this.email + ' gesendet.'; // Nach 2 Sekunden ausblenden
        }, 4000);
        
        setTimeout(() => {
          this.successMessage = ''; // Nach 5 Sekunden ausblenden
        }, 8000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Ein Fehler ist aufgetreten.';
      }
    });
  }
}