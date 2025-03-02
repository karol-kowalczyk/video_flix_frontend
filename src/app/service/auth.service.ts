import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users/';
  private tokenKey = 'videoflix_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Registrierungsmethode
  register(user: { email: string; password: string; confirm_password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Login-Methode mit automatischem Token-Handling
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials).pipe(
      tap((response: any) => {
        if (response?.token) {
          this.saveToken(response.token);
          this.router.navigate(['/']);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Token im LocalStorage speichern
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Token aus LocalStorage holen
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Logout-Methode
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Prüft ob ein Token vorhanden ist
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Error-Handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';
    
    if (error.error instanceof ErrorEvent) {
      // Client-seitiger Fehler
      errorMessage = `Fehler: ${error.error.message}`;
    } else {
      // Server-seitiger Fehler
      if (error.status === 0) {
        errorMessage = 'Keine Verbindung zum Server';
      } else if (error.status === 400) {
        errorMessage = 'Ungültige Anmeldedaten';
      } else if (error.status === 401) {
        errorMessage = 'Nicht autorisiert';
      } else {
        errorMessage = `Fehler-Code: ${error.status}\nNachricht: ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}