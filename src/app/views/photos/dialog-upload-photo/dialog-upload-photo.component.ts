import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/shared/model/album.model';
import { Photo } from 'src/app/shared/model/photo.model';
import { PhotoService } from 'src/app/shared/service/photo.service';

@Component({
  selector: 'app-dialog-upload-photo',
  templateUrl: './dialog-upload-photo.component.html',
  styleUrls: ['./dialog-upload-photo.component.css']
})
export class DialogUploadPhotoComponent implements OnInit {
  public uploadForm!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { album: Album },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUploadPhotoComponent>,
    private rest: PhotoService
  ) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      files: ['', [Validators.required]]
    });
  }

  uploadPhoto(event: any, album: Album) {
    let photos: Photo[] = [];

    Array.prototype.forEach.call(event.target.files, (elem: File, index: number) => {
      let photo = new Photo();
      photo.file = elem;
      photo.albumId = album.id;

      photos.push(photo);
    });

    this.rest.postPhoto(photos).subscribe(
    data => {
      this.closeDialog();
      window.location.reload();
    },
    error=>{
      console.error();
      
    }
    );

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
