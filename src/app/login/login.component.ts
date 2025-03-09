import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule]
})
export class LoginComponent {
  /**
   * Flag to control the visibility of the password field.
   */
  showPassword = false;

  /**
   * Holds the user's login credentials (email and password).
   */
  credentials = { email: '', password: '' };

  /**
   * Flag indicating whether the login was successful.
   */
  loginSuccess = false;

  /**
   * Flag indicating whether the login request is in progress (loading state).
   */
  isLoading = false;

  /**
   * Holds any error message related to the login process.
   */
  errorMessage = '';

  /**
   * Creates an instance of LoginComponent.
   * 
   * @param authService The authentication service for handling login.
   * @param router The router instance for navigation after successful login.
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Toggles the visibility of the password field.
   * When called, it either shows or hides the password depending on the current state.
   * 
   * @returns {void}
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles the form submission for login.
   * It calls the auth service to authenticate the user with the provided credentials.
   * On successful login, it saves the authentication token, sets the login success flag, 
   * and redirects to the film list page after a brief delay.
   * If the login fails, it displays an error message.
   * 
   * @returns {void}
   */
  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  /**
   * Handles the successful login by saving the authentication token and redirecting to the film list.
   * 
   * @param {any} response - The response from the login attempt, including the token.
   * @returns {void}
   */
  private handleLoginSuccess(response: any): void {
    this.authService.saveToken(response.token);
    this.loginSuccess = true;
    this.isLoading = false;

    setTimeout(() => {
      this.router.navigate(['/film-list']);
    }, 2000);
  }

  /**
   * Handles errors that occur during the login process.
   * It sets an appropriate error message based on the response or defaults to a generic error.
   * 
   * @param {any} error - The error returned from the login attempt.
   * @returns {void}
   */
  private handleLoginError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.error?.message || 'Login fehlgeschlagen';
    console.error('Login fehlgeschlagen', error);
  }
}