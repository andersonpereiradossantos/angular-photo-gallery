import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Photo } from 'src/app/shared/model/photo.model';
import { PhotoService } from 'src/app/shared/service/photo.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { photo: Photo },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    private rest: PhotoService
  ) { }

  ngOnInit(): void {
  }

  deletePhoto(photo: Photo) {
    this.rest.deletePhoto(photo).subscribe(
    data => { 
      console.log("Deletado com sucesso");
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
