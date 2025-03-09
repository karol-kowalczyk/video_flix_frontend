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
  /** @member {string} email - The email address entered by the user. */
  email: string = '';

  /** @member {string} errorMessage - The error message displayed to the user. */
  errorMessage: string = '';

  /** @member {string} successMessage - The success message displayed to the user. */
  successMessage: string = '';

  /** @member {boolean} isLoading - Indicates whether a request is in progress. */
  isLoading: boolean = false;

  /**
   * @constructor
   * @param {Router} router - Angular Router service for navigation.
   * @param {AuthService} authService - Service for handling authentication-related operations.
   */
  constructor(private router: Router, private authService: AuthService) { }

  /**
   * Handles the form submission to check the email and initiate a password reset process.
   * Validates the email input and triggers the AuthService to check the email.
   * Displays success or error messages based on the response.
   * @method
   * @public
   * @returns {void}
   */
  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter an email address.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.checkEmail(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Email address ' + this.email + ' found.';

        setTimeout(() => {
          this.successMessage = 'An email with the password reset link has been sent to ' + this.email + '.';
        }, 4000);

        setTimeout(() => {
          this.successMessage = '';
        }, 8000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'An error occurred.';
      }
    });
  }
}