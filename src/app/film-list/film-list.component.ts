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
  /**
   * List of videos fetched from the backend.
   */
  videos: any[] = [];

  /**
   * Flag indicating whether videos are being loaded.
   */
  loading = true;

  /**
   * Flag indicating whether the modal for viewing a video is open.
   */
  isModalOpen = false;

  /**
   * The selected video that is currently being viewed in the modal.
   */
  selectedVideo: any = null;

  /**
   * Creates an instance of FilmListComponent.
   * 
   * @param authService The AuthService instance used for authentication-related operations.
   * @param router The Router instance used for navigation purposes.
   * @param videoService The VideoService instance used to fetch videos.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private videoService: VideoService
  ) {}

  /**
   * Lifecycle hook that runs after component initialization.
   * This method loads the videos when the component is initialized.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadVideos();
  }

  /**
   * Loads the list of videos by calling the VideoService.
   * It sets the loading state to false once the videos are loaded or an error occurs.
   * 
   * @returns {void}
   */
  loadVideos(): void {
    this.videoService.getVideos().subscribe(
      (data) => {
        this.videos = data;
        this.loading = false;
      },
      (error) => {
        this.handleVideoLoadingError(error);
      }
    );
  }

  /**
   * Handles errors that occur while loading the videos.
   * It logs the error to the console and stops the loading state.
   * 
   * @param {any} error The error returned from the video service.
   * @returns {void}
   */
  private handleVideoLoadingError(error: any): void {
    console.error('Fehler beim Laden der Videos:', error);
    this.loading = false;
  }

  /**
   * Opens a modal to display details of the selected video.
   * 
   * @param {any} video The video to be displayed in the modal.
   * @returns {void}
   */
  openModal(video: any): void {
    this.selectedVideo = video;
    this.isModalOpen = true;
  }

  /**
   * Closes the modal and clears the selected video.
   * 
   * @returns {void}
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedVideo = null;
  }

  /**
   * Logs the user out by clearing the local storage and navigating to the login page.
   * 
   * @returns {void}
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
