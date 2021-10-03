import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/shared/model/album.model';
import { AlbumService } from 'src/app/shared/service/album.service';

@Component({
  selector: 'app-dialog-form-rename-album',
  templateUrl: './dialog-form-rename-album.component.html',
  styleUrls: ['./dialog-form-rename-album.component.css']
})
export class DialogFormRenameAlbumComponent implements OnInit {

  public albumForm!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { album: Album },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormRenameAlbumComponent>,
    private rest: AlbumService
  ) { }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      id: [this.data.album.id, [Validators.required]],
      name: [this.data.album.name, [Validators.required]]
    });
  }

  public putAlbum() {
    let album = new Album();

    album.id = this.albumForm.value.id;
    album.name = this.albumForm.value.name;

    this.rest.putAlbum(album).subscribe(data => {
      console.log("Atualizado!");
    });

    window.location.reload();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
