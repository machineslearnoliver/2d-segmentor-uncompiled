import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../file.service';
import {
  CanvasWhiteboardComponent,
  CanvasWhiteboardShapePreviewComponent
} from 'ng2-canvas-whiteboard';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-panel',
  templateUrl: './input-panel.component.html',
  styleUrls: ['./input-panel.component.css'],
  viewProviders: [CanvasWhiteboardComponent]
})
export class InputPanelComponent implements OnInit {
  constructor(public httpClient: HttpClient, public fileService: FileService) {}

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  private BACKEND_URL = this.fileService.BACKEND_URL;
  private file: string;

  form: FormGroup;
  myImage: File = null;
  imagePreview: string = '';
  usingMask = false;

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null)
    });

    this.setupWhiteboardStyling();
    this.loadOriginalFile();
  }

  // Setup the stylings for the canvas drawing features
  setupWhiteboardStyling() {
    this.canvasWhiteboard.setDrawingEnabled(true);
    this.canvasWhiteboard.toggleFillColorPicker(false);
    this.canvasWhiteboard.lineWidth = 5;
    this.canvasWhiteboard.drawButtonEnabled = false;
    this.canvasWhiteboard.clearButtonEnabled = false;
    this.canvasWhiteboard.saveDataButtonEnabled = false;
    this.canvasWhiteboard.imageUrl = 'assets/img.png';
  }

  // Clear canvas
  onClear() {
    this.fileService.useMask(false);
    this.canvasWhiteboard.clearCanvas();
  }

  // Take canvas image, generate Blob|File and post to server
  onMask() {
    // Change the backend method to use
    this.fileService.useMask(true);

    // Briefly remove the image prior to masking as its part of the canvas,
    // therefor the mask wouldn't generate properly
    this.canvasWhiteboard.imageUrl = '';
    this.canvasWhiteboard.generateCanvasBlob(generatedBlob => {
      this.fileService.saveMasktoServer(generatedBlob);
      this.fileService.hasMaskSelected = true;
    });

    // Re-add the mask
    this.canvasWhiteboard.imageUrl = 'assets/img.png';
  }

  // Pull in the uploaded image from the backend
  loadOriginalFile() {
    this.httpClient
      .get(this.BACKEND_URL + 'getOriginalFile')
      .subscribe(responseData => {
        console.log(responseData);
        const filePath = responseData['path'];
        const rootPath = this.BACKEND_URL;
        this.file = rootPath + filePath;
      });
  }
}
