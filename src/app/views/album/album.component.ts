import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/model/album.model';
import { AlbumService } from 'src/app/shared/service/album.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  albums : any | undefined;  

  constructor(
    public albumService: AlbumService,
    public _router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAlbuns();
  }

  getAlbuns(){
    this.albumService.getAlbums().subscribe((data: Album) => {
        this.albums = data;
      }
    );
  }

  getPhotos(albumid : number | undefined){
    this._router.navigate(['/photos', albumid])
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
