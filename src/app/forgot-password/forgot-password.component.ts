import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  newPassword: string = '';             // Neues Passwort
  confirmPassword: string = '';         // Bestätigung des neuen Passworts
  showNewPassword: boolean = false;     // Sichtbarkeit des neuen Passworts
  showConfirmPassword: boolean = false; // Sichtbarkeit der Passwortbestätigung
  resetSuccess: boolean = false;        // Erfolgsmeldung
  errorMessage: string = '';            // Fehlermeldung
  isLoading: boolean = false;           // Ladezustand

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  /**
   * Wird aufgerufen, wenn das Formular abgeschickt wird.
   */
  onSubmit() {
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

    // UID und Token aus der URL extrahieren
    const uid = this.route.snapshot.queryParamMap.get('uid');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (uid && token) {
      // API-Aufruf zum Zurücksetzen des Passworts
      this.http.post(`http://127.0.0.1:8000/users/reset-password/${uid}/${token}/`, {
        new_password: this.newPassword
      }).subscribe({
        next: () => {
          this.resetSuccess = true;
          this.isLoading = false;

          // Weiterleitung zur Login-Seite nach 2 Sekunden
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Fehler beim Zurücksetzen des Passworts!';
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Ungültiger Link!';
    }
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
