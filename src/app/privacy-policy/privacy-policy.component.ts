import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
