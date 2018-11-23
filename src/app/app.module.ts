import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { OutputPanelComponent } from './output-panel/output-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import {
  MatSliderModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatProgressBarModule,
  MatCardModule,
  MatGridListModule
} from '@angular/material';
import { UploadComponent } from './upload/upload.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputPanelComponent } from './input-panel/input-panel.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
@NgModule({
  declarations: [
    AppComponent,
    ToolPanelComponent,
    OutputPanelComponent,
    MainPanelComponent,
    UploadComponent,
    InputPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    HttpModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatGridListModule,
    CanvasWhiteboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
