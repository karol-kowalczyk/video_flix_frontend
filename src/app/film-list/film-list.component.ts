import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { VideoService } from '../service/video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  videos: any[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getVideos().subscribe(
      (data) => {
        this.videos = data;
        this.loading = false; /* Spinner ausblenden */
      },
      (error) => {
        console.error('Fehler beim Laden der Videos:', error);
        this.loading = false; /* Auch bei Fehlern Spinner ausblenden */
      }
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}