import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Hier importieren
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule, FooterComponent]
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  user = { email: '', password: '', confirm_password: '' };
  policyAccepted = false;
  registrationSuccess = false;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // togglePasswordVisibility bleibt gleich

  onSubmit() {
    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        this.isLoading = false;
        
        // Formular zurücksetzen
        this.user = { email: '', password: '', confirm_password: '' };
        this.policyAccepted = false;

        // Weiterleitung nach 2 Sekunden
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Registrierung fehlgeschlagen';
        console.error('Registrierung fehlgeschlagen', error);
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm-password') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
      const input = document.getElementById('password') as HTMLInputElement;
      if (input) {
        input.type = this.showPassword ? 'text' : 'password';
      }
    } else if (field === 'confirm-password') {
      this.showConfirmPassword = !this.showConfirmPassword;
      const input = document.getElementById('confirm-password') as HTMLInputElement;
      if (input) {
        input.type = this.showConfirmPassword ? 'text' : 'password';
      }
    }
  }
}
