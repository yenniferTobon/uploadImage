import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service'
import { Photo } from '../../interfaces/Photo'
import { Router } from '@angular/router'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {
  photos = [];

  constructor(
    private photoService: PhotoService,
    private router: Router 
  ) { }

  ngOnInit() {
  }
}
