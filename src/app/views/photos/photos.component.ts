import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/shared/service/photo.service';
import { ActivatedRoute } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { Photo } from 'src/app/shared/model/photo.model';
import { MatDialog } from '@angular/material/dialog';
import { FormRenameComponent } from './dialog-form-rename/dialog-form-rename.component';
import { Album } from 'src/app/shared/model/album.model';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogSetCoverAlbumComponent } from './dialog-set-cover-album/dialog-set-cover-album.component';
import { DialogUploadPhotoComponent } from './dialog-upload-photo/dialog-upload-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public album?: Album;
  public albumId?: number;

  constructor(
    public photoService: PhotoService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogDelete: MatDialog,
    private dialogSetCover: MatDialog,
    private dialogUpload: MatDialog
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
    const dialogRef = this.dialogDelete.open(DialogDeleteComponent, {
      "width": "400px",
      data: { photo: photo }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSetCover(photo: Photo) {
    const dialogSetCover = this.dialogSetCover.open(DialogSetCoverAlbumComponent, {
      "width": "400px",
      data: { photo: photo }
    });
    dialogSetCover.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogUpload(album?: Album) {
    console.log(album);
    const dialogUpload = this.dialogUpload.open(DialogUploadPhotoComponent, {
      "width": "400px",
      data: { album: album }
    });

    dialogUpload.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}