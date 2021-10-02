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

  public apiEndpoint = environment.apiEndpoint + "Photo/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'rejectUnauthorized': 'false'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPhotosByAlbum(albumId: number): Observable<Album> {
    return this.httpClient.get<Album>(this.apiEndpoint + "Album/" + albumId);
  }

  public deletePhoto(photo: Photo): Observable<Photo> {
    console.log(photo);
    return this.httpClient.delete<Photo>(this.apiEndpoint + photo.id);
  }

  public setCoverAlbum(photo: Photo): Observable<Photo> {
    return this.httpClient.put<Photo>(this.apiEndpoint + "SetCoverAlbum/" + photo.id, photo, this.httpOptions);
  }

  public putPhoto(photo?: Photo): Observable<Photo> {
    return this.httpClient.put<Photo>(this.apiEndpoint + photo?.id, photo, this.httpOptions);
  }

  public postPhoto(photo?: Photo): Observable<Photo> {
    console.log(photo);
    const formData: FormData = new FormData();
    formData.append('AlbumId', photo!.albumId!.toString());
    formData.append('File', photo!.file!, photo!.file!.name);
    return this.httpClient.post<Photo>(this.apiEndpoint, formData, { headers: new HttpHeaders({ 'Content-Disposition': 'multipart/form-data', 'rejectUnauthorized': 'false' }) });
  }
}
