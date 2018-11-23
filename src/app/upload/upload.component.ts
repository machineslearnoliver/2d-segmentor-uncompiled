import { FileService } from '../file.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  constructor(public fileService: FileService, public route: ActivatedRoute) {}

  myImage: File = null;
  files: any[];
  form: FormGroup;
  imagePreview: string = '';

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null)
    });
  }

  onUploadImage() {
    console.log(this.form.value.file);
    this.fileService.saveFileToServer(this.form.value.file);
    this.fileService.hasFileSelected = true;
  }

  onImagePicked(event) {
    const im = new Image();
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: file });
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
