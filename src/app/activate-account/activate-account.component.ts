import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-activate-account',
  imports: [ FormsModule, CommonModule, RouterLink],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit {
  activationSuccess = false;
  activationError = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.activateAccount(token);
    } else {
      this.activationError = 'Ungültiger Aktivierungslink.';
    }
  }

  activateAccount(token: string) {
    this.authService.activateAccount(token).subscribe({
      next: () => {
        this.activationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Weiterleitung zur Login-Seite nach 3 Sekunden
      },
      error: (error) => {
        this.activationError = error.message || 'Aktivierung fehlgeschlagen.';
      }
    });
  }
}