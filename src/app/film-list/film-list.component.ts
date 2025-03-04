import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-film-list',
  imports: [],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}