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
  /**
   * The email entered by the user on the landing page.
   */
  email: string = '';

  /**
   * Stores the error message to be displayed when the email is invalid.
   */
  errorMessage: string = '';

  /**
   * Creates an instance of LandingPageComponent.
   * 
   * @param router The router instance to navigate to other pages.
   */
  constructor(private router: Router) { }

  /**
   * Handles the form submission. It validates the email entered by the user. 
   * If the email is valid, it redirects the user to the registration page with the email as a query parameter.
   * If the email is invalid, it shows an error message.
   * 
   * @returns {void}
   */
  onSubmit() {
    if (this.validateEmail(this.email)) {
      // Navigate to the registration page with the email as a query parameter
      this.router.navigate(['/register'], { queryParams: { email: this.email } });
    } else {
      // Show error message if the email is invalid
      this.showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    }
  }

  /**
   * Validates the provided email address using a regular expression.
   * 
   * @param {string} email - The email address to validate.
   * @returns {boolean} - Returns true if the email is valid, otherwise false.
   */
  private validateEmail(email: string): boolean {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Displays an error message for a brief period (3 seconds).
   * 
   * @param {string} message - The error message to display.
   * @returns {void}
   */
  private showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);
  }
}