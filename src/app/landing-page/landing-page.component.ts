import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.validateEmail(this.email)) {
      // Weiterleitung zur Registrierungsseite mit E-Mail als Query-Parameter
      this.router.navigate(['/register'], { queryParams: { email: this.email } });
    } else {
      // Fehlermeldung anzeigen
      this.showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    }
  }

  private validateEmail(email: string): boolean {
    // Regex für E-Mails mit Buchstaben, Zahlen, Punkten, Bindestrichen und Unterstrichen im lokalen Teil
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  

  private showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);
  }
}