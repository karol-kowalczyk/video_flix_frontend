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
export class RegisterComponent implements OnInit {
  /**
   * Flag to control the visibility of the password field.
   */
  showPassword = false;

  /**
   * Flag to control the visibility of the confirm password field.
   */
  showConfirmPassword = false;

  /**
   * Holds the user input for registration, including email, password, and confirm password.
   */
  user = { email: '', password: '', confirm_password: '' };

  /**
   * Flag indicating whether the user has accepted the policy.
   */
  policyAccepted = false;

  /**
   * Flag indicating whether the registration was successful.
   */
  registrationSuccess = false;

  /**
   * Flag indicating whether the registration is in progress (loading state).
   */
  isLoading = false;

  /**
   * Holds any error message related to the registration process.
   */
  errorMessage = '';

  /**
   * Creates an instance of RegisterComponent.
   * 
   * @param authService The authentication service for handling registration.
   * @param router The router instance for navigation after successful registration.
   * @param route The activated route to access query parameters (for auto-filling email).
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * OnInit lifecycle hook that subscribes to the route's query parameters and
   * pre-fills the email field if an email is provided in the query.
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.user.email = params['email'];
      }
    });
  }

  /**
   * Handles the form submission for registration.
   * It validates the password and confirm password fields and then calls the authentication service.
   * If successful, it resets the form and redirects to the login page after 2 seconds.
   * 
   * @returns {void}
   */
  onSubmit() {
    if (!this.isPasswordMatching()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.registerUser();
  }

  /**
   * Checks if the password and confirm password match.
   * 
   * @returns {boolean} - Returns true if passwords match, otherwise false.
   */
  private isPasswordMatching(): boolean {
    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return false;
    }
    return true;
  }

  /**
   * Calls the auth service to register the user and handles the response.
   * 
   * @returns {void}
   */
  private registerUser(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => this.handleRegistrationSuccess(),
      error: (error) => this.handleRegistrationError(error)
    });
  }

  /**
   * Handles the successful registration by resetting the form and redirecting to the login page.
   * 
   * @returns {void}
   */
  private handleRegistrationSuccess(): void {
    this.registrationSuccess = true;
    this.isLoading = false;

    // Reset the form after successful registration
    this.user = { email: '', password: '', confirm_password: '' };
    this.policyAccepted = false;

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  /**
   * Handles errors during the registration process.
   * 
   * @param {any} error - The error returned from the registration attempt.
   * @returns {void}
   */
  private handleRegistrationError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.message || 'Registrierung fehlgeschlagen';
    console.error('Registrierung fehlgeschlagen', error);
  }


  /**
   * Toggles the visibility of the password field or the confirm password field.
   * 
   * @param field The field to toggle visibility ('password' or 'confirm-password').
   * @returns {void}
   */
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