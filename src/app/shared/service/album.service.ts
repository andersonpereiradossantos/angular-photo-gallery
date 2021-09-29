import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../model/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  apiUrl = "https://localhost:44332/api/Album";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'rejectUnauthorized': 'false'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAlbums(): Observable<Album> {
    return this.httpClient.get<Album>(this.apiUrl);
  }

  public postAlbum(album: Album): Observable<Album> {
    console.log(album);
    return this.httpClient.post<Album>(this.apiUrl, album, this.httpOptions);
  }

  public deleteAlbum(albumId: number): Observable<Album> {
    return this.httpClient.delete<Album>(this.apiUrl + "/" + albumId);
  }
}
