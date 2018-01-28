/**
 * @file
 * Contains implementation of service to send data of files.
 */

// Core imports.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * UploadFileService provides methods to send data of files.
 */
@Injectable()
export class UploadFileService {
  /**
   * Upload file api URL.
   * @type {string}
   */
  static readonly filesListEndpoint = 'http://drupal-7-56.dd:8083/sapi/index.php';

  constructor(private httpClient: HttpClient) { }

  /**
   * Puts files data.
   * @param {Object} filesData
   *   Data to put.
   * @returns {Observable<any | any>}
   *   Observable.
   */
  uploadFile(filesData): Observable<HttpEvent<any>> {
    if (filesData.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < filesData.length; i++) {
        formData.append(`file_${i}`, filesData[i]);
      }
      const headers = new HttpHeaders();
      headers.append('Accept', 'application/json');
      const params = new HttpParams()
      const options = {
        headers,
        params,
        reportProgress: true
      };
      const req = new HttpRequest('POST', UploadFileService.filesListEndpoint, formData, options);
      return this.httpClient.request(req).catch(error => Observable.throw(error));
    }
  }
}
