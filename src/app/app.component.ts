import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'segmentor';
  constructor(public fileService: FileService) {}
  ngOnInit() {}
}
