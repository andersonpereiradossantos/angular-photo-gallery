import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/shared/service/photo.service';
import { ActivatedRoute } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { Photo } from 'src/app/shared/model/photo.model';
import { MatDialog } from '@angular/material/dialog';
import { FormRenameComponent } from './form-rename/form-rename.component';
import { Album } from 'src/app/shared/model/album.model';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  album?: Album;
  public albumId?: number;

  constructor(
    public photoService: PhotoService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogDelete: MatDialog
  ) { }

  ngOnInit(): void {
    this.albumId = parseInt(this._route.snapshot.params['albumId']);
    this.getPhotosByAlbum(this.albumId);
  }

  getPhotosByAlbum(albumId: number) {
    this.photoService.getPhotosByAlbum(albumId).subscribe(data => {
      this.album = data;
    });
  }

  setCoverAlbum(photoId: number) {
    this.photoService.setCoverAlbum(photoId).subscribe(data => {
      console.log("Ok");
    });
  }

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

  disappearContext() {
    this.contextMenu.closeMenu();
  }

  openDialog(photo: Photo) {
    const dialogRef = this.dialog.open(FormRenameComponent, {
      "width": "400px",
      data: { photo: photo }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDelete(photo: Photo) {
    const dialogRefDelete = this.dialogDelete.open(DialogDeleteComponent, {
      "width": "400px",
      data: { photo: photo }
    });
    dialogRefDelete.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}