import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/app/shared/model/photo.model';
import { PhotoService } from 'src/app/shared/service/photo.service';

@Component({
  selector: 'app-form-rename',
  templateUrl: './form-rename.component.html',
  styleUrls: ['./form-rename.component.css']
})
export class FormRenameComponent implements OnInit {
  public photoForm!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { photo: Photo },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormRenameComponent>,
    private rest: PhotoService
  ) { }

  ngOnInit(): void {
    this.photoForm = this.fb.group({
      id: [this.data.photo.id, [Validators.required]],
      name: [this.data.photo.name, [Validators.required]]
    });
  }

  public putPhoto() {
    let photo = new Photo();

    photo.id = this.photoForm.value.id;
    photo.name = this.photoForm.value.name;

    this.rest.putPhoto(photo).subscribe(data => {
      console.log("Atualizado!");
    });

    window.location.reload();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
