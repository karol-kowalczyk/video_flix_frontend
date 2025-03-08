import { Component, OnInit } from '@angular/core'; // OnInit hinzufügen
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute hinzufügen
import { AuthService } from '../service/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule, FooterComponent]
})
export class RegisterComponent implements OnInit { // OnInit implementieren
  showPassword = false;
  showConfirmPassword = false;
  user = { email: '', password: '', confirm_password: '' };
  policyAccepted = false;
  registrationSuccess = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute // ActivatedRoute für Query-Parameter
  ) {}

  ngOnInit() {
    // E-Mail aus Query-Parametern abrufen und vorausfüllen
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.user.email = params['email'];
      }
    });
  }

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