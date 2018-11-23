import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  constructor(public fileService: FileService) {}
  hasFileSelected = false;
  fileStatusSub: Subscription = null;

  ngOnInit() {
    this.fileStatusSub = this.fileService.fileStatusChanged.subscribe(
      result => {
        this.hasFileSelected = result;
      }
    );
  }
}
