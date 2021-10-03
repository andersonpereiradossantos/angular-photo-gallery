import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/shared/model/album.model';
import { AlbumService } from 'src/app/shared/service/album.service';

@Component({
  selector: 'app-dialog-delete-album',
  templateUrl: './dialog-delete-album.component.html',
  styleUrls: ['./dialog-delete-album.component.css']
})
export class DialogDeleteAlbumComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { album: Album },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogDeleteAlbumComponent>,
    private rest: AlbumService
  ) { }

  ngOnInit(): void {
  }

  deleteAlbum(album: Album) {
    this.rest.deleteAlbum(album).subscribe(
    data => { 
      console.log("Delete with success");
      window.location.reload();
    },
    error =>{
      console.log("Ocorreu um erro ao excluir");
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
