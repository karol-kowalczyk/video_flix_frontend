import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Video {
  id: number;
  title: string;
  video_file: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://127.0.0.1:8000/api/videos/';
  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }
}