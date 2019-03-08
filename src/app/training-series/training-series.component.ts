import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { SDFService } from './sdf.service';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Model } from '../Model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-training-series',
  templateUrl: './training-series.component.html',
  styleUrls: ['./training-series.component.css']
})
export class TrainingSeriesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    // private molService: SDFService,
    private model: Model,
    private router: Router,
  ) { }
  url: string = environment.baseUrl + 'upload';
  public uploader: FileUploader = new FileUploader({
    url: this.url,
    itemAlias: 'file',
  });

  /**
   * Checks if the first step is completed and initites the upload method observable
   */
  ngOnInit(): void {
    this.uploadFile();
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      const extension = fileItem.file.name.split('.');
      fileItem.file.name = this.model.name + '_' + this.model.version + '.' + extension[1];
      console.log('onCompleteItem');
      console.log(fileItem);
      console.log('--------');
    };
    /*this.uploader.onAfterAddingFile = (file) => {
      console.log('***** onAfterAddingFile ******');
      console.log('file ', file.file.name);
      file.file.name = 'nacho';
    };*/
  }
  /**
   * Uploads the sdf file to the server and uses a toastr to informs the user
   */
  uploadFile(): void {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      if (response !== '0') {
        //  this.toastr.success('SDF uploaded correctly', 'Success!', { closeButton: true, positionClass: 'toast-bottom-right' });
        const data = JSON.parse(response);
        console.log('####################');
        console.log(data);
        console.log('####################');
        if (data) {
          this.model.molNumber = data[0];
          this.model.fileFields = Object.keys(data[1]);
          this.model.fileData = data[1];
          this.model.file = data[2];
        }
        console.log(this.model);
      } else {
        // this.toastr.error('Invalid file', 'Error', { closeButton: true, positionClass: 'toast-bottom-right' });
      }
    };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      // this.toastr.error('File upload failed', 'Error');
    };
  }

}
