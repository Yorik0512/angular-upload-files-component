import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Headers, Http} from '@angular/http';

/**
 * UploadFileService provides methods to send data of files.
 */
@Injectable()
export class UploadFileService {
  /**
   * Api URL.
   * @type {string}
   */
  static readonly filesListEndpoint = 'http://drupal-7-56.dd:8083/sapi/index.php';

  constructor(private httpClient: Http) { }

/**
   * Puts files data.
   * @param {Object} filesData
   *   Data to put.
   * @returns {Observable<any | any>}
   *   Observable.
   */
  uploadFile(filesData): Observable<any> {
    if (filesData.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < filesData.length; i++) {
        formData.append(`file_${i}`, filesData[i]);
      }
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      //reportProgress: true,
      //https://stackoverflow.com/questions/40214772/file-upload-in-angular
      return this.httpClient.post(UploadFileService.filesListEndpoint, formData, { headers })
        .map(response => response.json())
        .catch(error => Observable.throw(error));
    }
  }
}
