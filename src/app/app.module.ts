import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { AlbumComponent } from './views/album/album.component';
import { PhotosComponent } from './views/photos/photos.component';
import { FormComponent } from './views/album/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FormRenameComponent } from './views/photos/dialog-form-rename/dialog-form-rename.component';
import { DialogDeleteComponent } from './views/photos/dialog-delete/dialog-delete.component';
import { DialogSetCoverAlbumComponent } from './views/photos/dialog-set-cover-album/dialog-set-cover-album.component';
import { DialogUploadPhotoComponent } from './views/photos/dialog-upload-photo/dialog-upload-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    PhotosComponent,
    FormComponent,
    FormRenameComponent,
    DialogDeleteComponent,
    DialogSetCoverAlbumComponent,
    DialogUploadPhotoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
