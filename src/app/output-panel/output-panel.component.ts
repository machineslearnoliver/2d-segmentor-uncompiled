import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-output-panel',
  templateUrl: './output-panel.component.html',
  styleUrls: ['./output-panel.component.css']
})
export class OutputPanelComponent implements OnInit {
  constructor(
    public httpClient: HttpClient,
    private fileService: FileService
  ) {}

  file: string;
  private BACKEND_URL = this.fileService.BACKEND_URL;
  urlToUse = '';
  urlToUseChanged: Subscription = null;

  ngOnInit() {
    this.loadOriginalFile();
    this.useMask(false);

    this.urlToUseChanged = this.fileService.urlToUseChanged.subscribe(
      result => {
        this.useMask(result);
      }
    );
  }

  // If there's content on the canvas, use masking python functions
  // If the canvas is blank, use standard segmentation python functions
  useMask(enabled: boolean) {
    if (enabled) {
      this.urlToUse = 'getSegmentedFileWithThreshAndMask/';
    } else {
      this.urlToUse = 'getSegmentedFileWithThresh/';
    }
  }

  sliderChanged(event: any) {
    this.loadSegmentedFileWithThresholdOf(event.value);
  }

  // Push threshold to backend, return segmented image
  loadSegmentedFileWithThresholdOf(thresh: number) {
    this.httpClient
      .get(this.BACKEND_URL + this.urlToUse + thresh)
      .subscribe(responseData => {
        const filePath = responseData['path'];
        const rootPath = this.BACKEND_URL;
        this.file = rootPath + filePath;
        console.log();
      });
  }

  // Pull original uploaded file
  loadOriginalFile() {
    this.httpClient
      .get(this.BACKEND_URL + 'getOriginalFile')
      .subscribe(responseData => {
        const filePath = responseData['path'];
        const rootPath = this.BACKEND_URL;
        this.file = rootPath + filePath;
        console.log(this.file);
      });
  }
}
