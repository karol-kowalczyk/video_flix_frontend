import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule, FooterComponent]
})
export class LoginComponent {
  showPassword = false;
  credentials = { email: '', password: '' };
  loginSuccess = false;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        this.loginSuccess = true;
        this.isLoading = false;
        
        setTimeout(() => {
          this.router.navigate(['/film-list']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login fehlgeschlagen';
        console.error('Login fehlgeschlagen', error);
      }
    });
  }
}