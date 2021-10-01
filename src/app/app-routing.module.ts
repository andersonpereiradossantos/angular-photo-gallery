import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './views/album/album.component';
import { PhotosComponent } from './views/photos/photos.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'albums',
    pathMatch: 'full'
  },
  {
    path:'albums',
    component: AlbumComponent
  },
  {
    path:'photos/:albumId',
    component: PhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
