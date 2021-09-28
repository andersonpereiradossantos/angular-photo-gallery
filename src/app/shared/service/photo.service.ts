import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../model/album.model';
import { Photo } from '../model/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = "https://localhost:44332/api/Photo";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPhotosByAlbum(albumid : number): Observable<Album> {
    return this.httpClient.get<Album>(this.apiUrl + "/Album/" + albumid);
  }
}
