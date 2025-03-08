import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  email: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email) {
      // Weiterleitung zur Registrierungsseite mit E-Mail als Query-Parameter
      this.router.navigate(['/register'], { queryParams: { email: this.email } });
    } else {
      alert('Bitte geben Sie eine E-Mail-Adresse ein.');
    }
  }
}