import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * RegisterComponent ist eine Angular-Komponente, die die Benutzerregistrierung handhabt.
 * Sie ermöglicht es Benutzern, ein neues Konto zu erstellen und validiert die Eingaben.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterLink, FormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  /** Steuert die Sichtbarkeit des Passwortfelds. */
  showPassword = false;

  /** Steuert die Sichtbarkeit des Passwort-Bestätigungsfelds. */
  showConfirmPassword = false;

  /** Speichert die Benutzereingaben für die Registrierung (E-Mail, Passwort, Passwort bestätigen). */
  user = { email: '', password: '', confirm_password: '' };

  /** Gibt an, ob der Benutzer die Datenschutzrichtlinie akzeptiert hat. */
  policyAccepted = false;

  /** Gibt an, ob die Registrierung erfolgreich war. */
  registrationSuccess = false;

  /** Steuert den Ladezustand während der Registrierung. */
  isLoading = false;

  /** Speichert Fehlermeldungen, die während der Registrierung auftreten. */
  errorMessage = '';

  /** Speichert Erfolgsmeldungen nach erfolgreicher Registrierung. */
  registrationSuccessMessage = '';

  /**
   * Konstruktor der RegisterComponent.
   * @param authService - Der AuthService, der die Registrierungslogik handhabt.
   * @param router - Der Router für die Navigation nach der Registrierung.
   * @param route - Die ActivatedRoute, um Query-Parameter auszulesen.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird.
   * Liest die E-Mail aus den Query-Parametern und füllt das E-Mail-Feld automatisch aus.
   */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.user.email = params['email'];
      }
    });
  }

  /**
   * Handhabt das Absenden des Registrierungsformulars.
   * Überprüft, ob die Passwörter übereinstimmen, und startet die Registrierung.
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
   * Überprüft, ob das Passwort und die Passwort-Bestätigung übereinstimmen.
   * @returns {boolean} - Gibt `true` zurück, wenn die Passwörter übereinstimmen, sonst `false`.
   */
  private isPasswordMatching(): boolean {
    if (this.user.password !== this.user.confirm_password) {
      this.errorMessage = 'Passwörter stimmen nicht überein!';
      return false;
    }
    return true;
  }

  /**
   * Ruft den AuthService auf, um den Benutzer zu registrieren.
   * Handhabt die Antwort des Servers und zeigt entsprechende Meldungen an.
   */
  private registerUser(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => this.handleRegistrationSuccess(),
      error: (error) => this.handleRegistrationError(error)
    });
  }

  /**
   * Handhabt eine erfolgreiche Registrierung.
   * Setzt das Formular zurück und zeigt eine Erfolgsmeldung an.
   */
  private handleRegistrationSuccess(): void {
    this.registrationSuccess = true;
    this.isLoading = false;

    // Setzt das Formular zurück
    this.user = { email: '', password: '', confirm_password: '' };
    this.policyAccepted = false;

    // Zeigt die Erfolgsmeldung an
    this.errorMessage = ''; // Löscht vorherige Fehlermeldungen
    this.registrationSuccessMessage = 'Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail, um Ihr Konto zu aktivieren.';

    // Versteckt die Meldungen nach 7 Sekunden
    this.hideMessagesAfterDelay();
  }

  /**
   * Handhabt Fehler während der Registrierung.
   * Zeigt eine Fehlermeldung an und protokolliert den Fehler in der Konsole.
   * @param error - Der Fehler, der vom Server zurückgegeben wurde.
   */
  private handleRegistrationError(error: any): void {
    this.isLoading = false;
    this.errorMessage = error.message || 'Registrierung fehlgeschlagen';
    console.error('Registrierung fehlgeschlagen', error);

    // Versteckt die Meldungen nach 7 Sekunden
    this.hideMessagesAfterDelay();
  }

  /**
   * Versteckt die Erfolgs- und Fehlermeldungen nach einer Verzögerung von 7 Sekunden.
   */
  private hideMessagesAfterDelay() {
    setTimeout(() => {
      this.registrationSuccessMessage = '';
      this.errorMessage = '';
    }, 7000); // 7000 Millisekunden = 7 Sekunden
  }

  /**
   * Schaltet die Sichtbarkeit des Passwortfelds oder des Passwort-Bestätigungsfelds um.
   * @param field - Das Feld, dessen Sichtbarkeit umgeschaltet werden soll ('password' oder 'confirm-password').
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