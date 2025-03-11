import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** API base URL for user-related endpoints */
  private apiUrl = 'https://videoflix-backend.karol-kowalczyk.de/users/';
  
  /** Key for storing the authentication token in localStorage */
  private tokenKey = 'videoflix_token';

  /**
   * Constructs the AuthService.
   * @param http - Angular's HttpClient for making HTTP requests.
   * @param router - Angular's Router for navigation.
   */
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Registers a new user.
   * @param user - An object containing email, password, and confirm_password.
   * @returns An Observable that emits the server response.
   */
  register(user: { email: string; password: string; confirm_password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Checks if an email is already registered.
   * @param email - The email address to check.
   * @returns An Observable that emits the server response.
   */
  checkEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}check-email/`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user and saves the authentication token if successful.
   * @param credentials - An object containing email and password.
   * @returns An Observable that emits the server response.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials).pipe(
      tap((response: any) => {
        if (response?.token) {
          this.saveToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Saves the authentication token in localStorage.
   * @param token - The token to save.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the authentication token from localStorage.
   * @returns The stored token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated.
   * @returns True if a token is stored, otherwise false.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('videoflix_token');
    return !!token;
  }

  /**
   * Logs out the user by removing the token and redirecting to the login page.
   */
  logout(): void {
    localStorage.removeItem('videoflix_token');
    this.router.navigate(['/login']);
  }

/**
 * Handles HTTP errors by determining if the error is client-side or server-side.
 * @private
 * @param error - The HttpErrorResponse received from the server.
 * @returns An Observable that throws an error with a user-friendly message.
 */
private handleError(error: HttpErrorResponse): Observable<never> {
  const errorMessage = error.error instanceof ErrorEvent
    ? this.getClientErrorMessage(error)
    : this.getServerErrorMessage(error);

  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}

/**
 * Generates an error message for client-side errors.
 * @private
 * @param error - The client-side error response.
 * @returns A user-friendly error message.
 */
private getClientErrorMessage(error: HttpErrorResponse): string {
  return `Error: ${error.error.message}`;
}

/**
 * Generates an error message for server-side errors.
 * @private
 * @param error - The server-side error response.
 * @returns A user-friendly error message based on status code.
 */
private getServerErrorMessage(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
      return 'No connection to the server';
    case 400:
      return error.error.message || 'Invalid request';
    case 401:
      return 'Not authorized';
    case 404:
      return 'Email address not found';
    default:
      return `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
}

}
