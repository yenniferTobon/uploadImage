import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosListComponent } from './components/photos-list/photos-list.component'
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component'
import { PhotoDetailComponent } from  './components/photo-detail/photo-detail.component'

const routes: Routes = [
  {
    path: 'photos',
    component: PhotoDetailComponent
  },
  {
    path: 'photos/new',
    component: PhotoUploadComponent
  },
  {
    path: 'photos/:id',
    component: PhotoDetailComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
