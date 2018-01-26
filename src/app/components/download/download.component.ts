import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest, HttpEventType} from '@angular/common/http';
import 'rxjs/add/operator/map';

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
  public addedFilesStatus = false;

  constructor(private upload: UploadFileService, private http: HttpClient) { }

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
        .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              console.log(`File is ${percentDone}% loaded.`);
            }
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
              return event.body;
            }
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
