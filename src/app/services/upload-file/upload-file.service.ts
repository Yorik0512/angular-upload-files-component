import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams} from '@angular/common/http';
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
   * Api URL.
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
    // https://embed.plnkr.co/ozZqbxIorjQW15BrDFrg/
    // https://blog.angularindepth.com/the-new-angular-httpclient-api-9e5c85fe3361
    // https://stackoverflow.com/questions/39932788/update-bootstrap-progress-bar-on-upload-file-angular-2
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
        requestProgress: true
      };
      return this.httpClient.post(UploadFileService.filesListEndpoint, formData, options)
        .catch(error => Observable.throw(error));
    }
  }
}
