import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/shared/service/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos : any | undefined;  
  public albumid : number | undefined;

  constructor(
    public photoService: PhotoService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.albumid = parseInt(this._route.snapshot.params['albumid']);
    this.getPhotosByAlbum(this.albumid);
  }

  getPhotosByAlbum(albumid : number){
    this.photoService.getPhotosByAlbum(albumid).subscribe(data => {
      this.photos = data;
    });
  }
}
