import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/shared/service/photo.service';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Photo } from 'src/app/shared/model/photo.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  album: any | undefined;
  public albumid: number | undefined;

  constructor(
    public photoService: PhotoService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.albumid = parseInt(this._route.snapshot.params['albumid']);
    this.getPhotosByAlbum(this.albumid);
  }

  getPhotosByAlbum(albumid: number) {
    this.photoService.getPhotosByAlbum(albumid).subscribe(data => {
      this.album = data;
    });
  }

  deletePhoto(photoId: number) {
    this.photoService.deletePhoto(photoId).subscribe(data => { });
  }

  // @ViewChild('menu') menu!:ElementRef 
  // contextMenu(event: MouseEvent) { 
  //   event.preventDefault();
  //   this.menu.nativeElement.style.display = "block";
  //   this.menu.nativeElement.style.top = event.pageY + "px";
  //   this.menu.nativeElement.style.left = event.pageX + "px";
  // } 

  // disappearContext(){
  //   this.menu.nativeElement.style.display = "none";
  // }

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: Photo) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  
  disappearContext(){
    this.contextMenu.closeMenu();
  }
}