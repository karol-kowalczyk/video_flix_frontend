import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * RegisterComponent handles user registration.
 * It allows users to create a new account and validates input fields.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  /** Controls the visibility of the password field. */
  showPassword = false;

  /** Controls the visibility of the confirm password field. */
  showConfirmPassword = false;

  /** Stores user input for registration (email, password, confirm password). */
  user = { email: '', password: '', confirm_password: '' };

  /** Indicates whether the user has accepted the privacy policy. */
  policyAccepted = false;

  /** Indicates whether the registration was successful. */
  registrationSuccess = false;

  /** Controls the loading state during registration. */
  isLoading = false;

  /** Stores error messages that occur during registration. */
  errorMessage = '';

  /** Stores success messages after successful registration. */
  registrationSuccessMessage = '';

  /**
   * Constructor for RegisterComponent.
   * @param {AuthService} authService - The AuthService handling registration logic.
   * @param {Router} router - The router for navigation after registration.
   * @param {ActivatedRoute} route - The ActivatedRoute to read query parameters.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle hook called when the component is initialized.
   * Reads the email from query parameters and auto-fills the email field.
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.user.email = params['email'];
      }
    });
  }

  /**
   * Handles the submission of the registration form.
   * Checks if passwords match and initiates registration.
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
   * @returns {boolean} - Returns `true` if passwords match, otherwise `false`.
   */
  private isPasswordMatching(): boolean {
    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwords do not match!';
      return false;
    }
    return true;
  }

  /**
   * Calls the AuthService to register the user.
   * Handles server responses and displays appropriate messages.
   */
  private registerUser(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => this.handleRegistrationSuccess(),
      error: (error) => this.handleRegistrationError(error)
    });
  }

  /**
   * Handles a successful registration.
   * Resets the form and displays a success message.
   */
  private handleRegistrationSuccess(): void {
    this.registrationSuccess = true;
    this.isLoading = false;

    // Reset form fields
    this.user = { email: '', password: '', confirm_password: '' };
    this.policyAccepted = false;

    // Display success message
    this.errorMessage = '';
    this.registrationSuccessMessage = 'Registration successful! Please check your email to activate your account.';

    // Hide messages after 7 seconds
    this.hideMessagesAfterDelay();
  }

  /**
   * Handles errors during registration.
   * Displays an error message and logs the error to the console.
   * @param {any} error - The error returned from the server.
   */
  private handleRegistrationError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.message || 'Registration failed';
    console.error('Registration failed', error);

    // Hide messages after 7 seconds
    this.hideMessagesAfterDelay();
  }

  /**
   * Hides success and error messages after a delay of 7 seconds.
   */
  private hideMessagesAfterDelay() {
    setTimeout(() => {
      this.registrationSuccessMessage = '';
      this.errorMessage = '';
    }, 7000);
  }

  /**
   * Toggles the visibility of the password or confirm password field.
   * @param {'password' | 'confirm-password'} field - The field to toggle visibility for.
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
