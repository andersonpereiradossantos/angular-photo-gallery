import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/app/shared/model/photo.model';
import { PhotoService } from 'src/app/shared/service/photo.service';

@Component({
  selector: 'app-dialog-set-cover-album',
  templateUrl: './dialog-set-cover-album.component.html',
  styleUrls: ['./dialog-set-cover-album.component.css']
})
export class DialogSetCoverAlbumComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { photo: Photo },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogSetCoverAlbumComponent>,
    private rest: PhotoService
  ) { }

  ngOnInit(): void {
  }

  setCoverAlbum(photo: Photo) {
    this.rest.setCoverAlbum(photo).subscribe(data => {
      this.closeDialog();
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
