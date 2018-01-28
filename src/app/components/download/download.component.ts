import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { HttpEventType} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  /**
   * File list from selected files.
   * @type {Array}
   */
  public fileList = [];

  /**
   * Drag over flag message.
   * @type {Boolean}
   */
  public fileMessageOnDragOverFlag = false;

  /**
   * Added files status flag.
   * @type {Boolean}
   */
  public addedFilesStatusFlag = false;

  /**
   * Progress file upload.
   * @type {Number}
   */
  public progressFileUpload = 0;

  /**
   * Disable upload button.
   * @type {Boolean}
   */
  public disabledButtons = true;

  /**
   * Constructor.
   * @param {UploadFileService} upload
   *   Upload file service.
   */
  constructor(private upload: UploadFileService) { }

  /**
   * On the drop file.
   * @param {Array} event
   *   Event params array.
   */
  onDropFile(event) {
    event.preventDefault();
    this.addDataToFileList(event.dataTransfer.files);
    this.fileMessageOnDragOverFlag = false;
  }

  /**
   * At the drag drop area.
   * @param {Array} event
   *   Event params array.
   */
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileMessageOnDragOverFlag = true;
  }

  /**
   * Leave drag drop area.
   * @param {Array} event
   *   Event params array.
   */
  onDragLeaveFile(event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileMessageOnDragOverFlag = false;
  }

  /**
   * On change select files.
   * @param {Array} event
   *   Event params array.
   */
  selectFile(event) {
    this.addDataToFileList(event.target.files);
    this.progressFileUpload = 0;
    this.disabledButtons = false;
  }

  /**
   * Clock on select files button.
   */
  clickOnSelector() {
    this.progressFileUpload = 0;
    this.disabledButtons = true;
  }

  /**
   * Remove file from files list.
   * @param {Object} file
   *   Object of current file.
   */
  removeFile(file) {
    this.fileList = this.fileList.filter(element => {
      return element.name !== file.name && element.size !== file.size;
    });
    if (this.fileList.length === 0) {
      this.disabledButtons = true;
    }
  }

  /**
   * Reset button.
   */
  resetButton() {
    this.fileList = [];
    this.progressFileUpload = 0;
    this.disabledButtons = true;
  }

  /**
   * Upload button button.
   */
  uploadButton() {
    this.disabledButtons = true;
    if (this.fileList.length > 0) {
      this.upload.uploadFile(this.fileList)
        .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              this.progressFileUpload = percentDone;
            }
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
              return event.body;
            }
          },
          (err) => {
            console.log('Upload Error:', err);
          }, () => {
            setTimeout(() => {
              this.fileList = [];
              this.progressFileUpload = 0;
            }, 500);
          }
        );
    } else {
      this.addedFilesStatusFlag = true;
    }
  }

  /**
   * Add files to the files list.
   * @param {Array} files
   *   Array of files params.
   */
  addDataToFileList(files) {
    for (const file of files) {
      this.fileList.push(file);
    }
    this.addedFilesStatusFlag = false;
  }
}
