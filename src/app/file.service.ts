import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService implements OnInit {
  hasFileSelected = false;
  hasMaskSelected = false;
  BACKEND_URL = 'http://localhost:5000/';
  BACKEND_DEPLOYEMENT_URL =
    'http://segment2d.6hjtvnaapi.us-east-2.elasticbeanstalk.com/';

  imageMask: any;
  urlToUse: string;

  fileStatusChanged: Subject<boolean> = new Subject();
  urlToUseChanged: Subject<boolean> = new Subject();
  maskStatusChanged: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {}

  useMask(enabled: boolean) {
    if (enabled) {
      this.urlToUseChanged.next(enabled);
    } else {
      this.urlToUseChanged.next(enabled);
    }
  }

  saveFileToServer(image: File) {
    const postData = new FormData();
    postData.append('file', image);
    const myData = { image: image };
    console.log(image);
    this.fileStatusChanged.next(true);

    this.httpClient
      .post(this.BACKEND_URL + 'upload', postData)
      .subscribe(responseData => {
        console.log('wrote the file', responseData);
        this.hasFileSelected = true;
        this.router.navigate(['/']);
      });
  }

  saveMasktoServer(image: File | Blob) {
    const postData = new FormData();
    postData.append('file', image);
    console.log(image);
    console.log(image);

    this.maskStatusChanged.next(true);

    this.httpClient
      .post(this.BACKEND_URL + 'uploadMask', postData)
      .subscribe(responseData => {
        console.log('wrote the file', responseData);
        this.hasMaskSelected = true;
        this.router.navigate(['/']);
      });
  }
}
