import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../model/album.model';
import { Photo } from '../model/photo.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public apiEndpoint =  environment.apiEndpoint + "Photo/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'rejectUnauthorized': 'false' 
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPhotosByAlbum(albumid : number): Observable<Album> {
    return this.httpClient.get<Album>(this.apiEndpoint + "Album/" + albumid);
  }

  public deletePhoto(photoId: number): Observable<Photo> {
    return this.httpClient.delete<Photo>(this.apiEndpoint + photoId);
  }
}
