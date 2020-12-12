import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HttpClient } from '@angular/common/http';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosListComponent,
    PhotoUploadComponent,
    NavigationBarComponent,
    PhotoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
