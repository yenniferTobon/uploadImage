import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../interfaces/Photo'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URL = 'http://' + environment.ip_server_back + ':' + environment.port_server_back + '/api/v1/photo';
  constructor(private http: HttpClient) { }

  createPhoto(title: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('image', photo);
    return this.http.post(this.URL, fd);
  } 

  getInfoPhoto(id:string) {
    return this.http.get<Photo>(this.URL+'/'+id);
  }
}
