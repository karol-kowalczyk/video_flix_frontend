import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  constructor(private router: Router) { }

  /**
   * Navigates the user to the login page.
   * This function uses the Angular router to redirect the user to the '/login' route.
   * 
   * @returns {void} - This function does not return anything.
   */
  navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
