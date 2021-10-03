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
    return this.httpClient.post<Album>(this.apiUrl, album, this.httpOptions);
  }

  public deleteAlbum(album: Album): Observable<Album> {
    return this.httpClient.delete<Album>(this.apiUrl + "/" + album.id);
  }

  public putAlbum(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(this.apiUrl + "/" + album.id, album, this.httpOptions);
  }
}
