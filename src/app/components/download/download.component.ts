import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Headers, Http, Response } from '@angular/http';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  // TODO:
  // - remove file from files list
  // - preloader for file
  // - add colors to variables in css
  
  public fileList;
  public fileStatusMessage = false;
  public addedFilesStatus =false;

  constructor(private upload: UploadFileService, private httpClient: Http) { }

  ngOnInit() {
  }

  // At the drag drop area
  onDropFile(event: DragEvent) {
    event.preventDefault();
    this.addDataToFileList(event.dataTransfer.files);
    this.fileStatusMessage = false;
  }

  // At the drag drop area
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileStatusMessage = true;
  }

  // Leave drag drop area
  onDragLeaveFile(event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileStatusMessage = false;
  }

  // At the file input element
  selectFile(event) {
    this.addDataToFileList(event.target.files);
  }
  
  // Remove file from list.
  removeFile(event) {
    console.log(event);
    console.log(this.fileList);
  }

  // Reset button.
  resetButton() {
    this.fileList = [];
  }

  // Upload button.
  uploadButton() {
    if (this.fileList.length > 0) {
      this.upload.uploadFile(this.fileList)
        .subscribe(data => {
            console.log(data);
            return data;
          },
          (err) => {
            console.log('Upload Error:', err);
          }, () => {
            console.log('Upload done');
          }
        );
    } else {
      this.addedFilesStatus = true;
    }
  }


  addDataToFileList(files) {
    this.fileList = files;
    this.addedFilesStatus = false;
  }

}
