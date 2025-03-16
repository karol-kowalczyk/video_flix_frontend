import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/**
 * ForgotPasswordComponent handles the logic for password reset functionality.
 * It allows the user to reset their password by providing a new password
 * and confirming it through a reset link sent via email.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  /**
   * The new password entered by the user.
   */
  newPassword: string = '';

  /**
   * The confirmation password entered by the user.
   */
  confirmPassword: string = '';

  /**
   * Flag for showing or hiding the new password field.
   */
  showNewPassword: boolean = false;

  /**
   * Flag for showing or hiding the confirm password field.
   */
  showConfirmPassword: boolean = false;

  /**
   * Flag indicating whether the password reset was successful.
   */
  resetSuccess: boolean = false;

  /**
   * Error message to be displayed in case of a failed password reset.
   */
  errorMessage: string = '';

  /**
   * Flag indicating the loading state during the password reset process.
   */
  isLoading: boolean = false;

  /**
   * Creates an instance of ForgotPasswordComponent.
   * 
   * @param router The Router instance used to navigate between views.
   * @param route The ActivatedRoute instance used to retrieve route parameters.
   * @param http The HttpClient instance used to send HTTP requests.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  /**
   * Handles the form submission for resetting the password.
   * It checks if the passwords match and if the new password meets the minimum length requirement.
   * If valid, it sends a request to reset the password, and redirects the user after success.
   * 
   * @returns {void}
   */
  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { uid, token } = this.extractResetParams();

    if (uid && token) {
      this.resetPassword(uid, token);
    } else {
      this.handleInvalidLink();
    }
  }

  /**
   * Extracts the user ID and token from the URL parameters.
   * 
   * @returns {object} Contains the UID and token from the URL.
   */
  private extractResetParams(): { uid: string | null; token: string | null } {
    const uid = this.route.snapshot.queryParamMap.get('uid');
    const token = this.route.snapshot.queryParamMap.get('token');
    return { uid, token };
  }

  /**
   * Sends a request to the server to reset the password.
   * 
   * @param {string} uid The user ID extracted from the URL.
   * @param {string} token The token extracted from the URL.
   * @returns {void}
   */
  private resetPassword(uid: string, token: string): void {
    this.http.post(`http://127.0.0.1:8000/users/reset-password/${uid}/${token}/`, {
      new_password: this.newPassword
    }).subscribe({
      next: () => {
        this.resetSuccess = true;
        this.isLoading = false;
        this.redirectToLogin();
      },
      error: (error) => {
        this.handleResetError(error);
      }
    });
  }

  /**
   * Handles the error if the password reset request fails.
   * 
   * @param {any} error The error response from the server.
   * @returns {void}
   */
  private handleResetError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.error?.error || 'Fehler beim Zurücksetzen des Passworts!';
  }

  /**
   * Handles the case when the URL parameters for UID and token are missing or invalid.
   * 
   * @returns {void}
   */
  private handleInvalidLink(): void {
    this.isLoading = false;
    this.errorMessage = 'Ungültiger Link!';
  }

  /**
   * Redirects the user to the login page after a successful password reset.
   * 
   * @returns {void}
   */
  private redirectToLogin(): void {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  /**
   * Toggles the visibility of the new password field.
   * 
   * @returns {void}
   */
  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  /**
   * Toggles the visibility of the confirm password field.
   * 
   * @returns {void}
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
