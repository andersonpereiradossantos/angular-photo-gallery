import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlbumService } from 'src/app/shared/service/album.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public albumForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    private rest: AlbumService
  ) { }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createAlbum() {
    this.rest.postAlbum(this.albumForm.value).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
