import { Component, OnInit, ViewChild } from '@angular/core';
import { Album } from 'src/app/shared/model/album.model';
import { AlbumService } from 'src/app/shared/service/album.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { DialogDeleteAlbumComponent } from './dialog-delete-album/dialog-delete-album.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { DialogFormRenameAlbumComponent } from './dialog-form-rename-album/dialog-form-rename-album.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  albums: any | undefined;

  constructor(
    public albumService: AlbumService,
    public _router: Router,
    public dialog: MatDialog,
    private dialogRename: MatDialog,
    private dialogDelete: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAlbuns();
  }

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: Album) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  openDialogRename(album: Album) {
    const dialogRef = this.dialogRename.open(DialogFormRenameAlbumComponent, {
      "width": "400px",
      data: { album: album }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  disappearContext() {
    this.contextMenu.closeMenu();
  }


  getAlbuns() {
    this.albumService.getAlbums().subscribe((data: Album) => {
      this.albums = data;
    }
    );
  }

  getPhotos(albumid: number | undefined) {
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

  openDialogDeleteAlbum(album: Album) {
    const dialogRef = this.dialogDelete.open(DialogDeleteAlbumComponent, {
      "width": "400px",
      data: { album: album }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
