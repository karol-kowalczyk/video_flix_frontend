import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprint',
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  /**
   * Creates an instance of ImprintComponent.
   * 
   * @param router The router instance used to navigate to other pages.
   */
  constructor(private router: Router) {}

  /**
   * Navigates the user to the login page when called.
   * This method uses the Angular router to redirect the user to the '/login' route.
   * 
   * @returns {void} - This function does not return anything.
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}