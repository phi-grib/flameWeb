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
  fileContent = '';
  num_of_mols = 0;
  type_file: string;


  /**
   * Checks if the first step is completed and initites the upload method observable
   */
  ngOnInit(): void {

  }

  public onChange(fileList: FileList): void {
    const file = fileList[0];
    this.model.file = file;
    const extension = file.name.split('.');
    this.type_file = extension[1];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.num_of_mols = (self.fileContent.match(/(\$\$\$\$)/g) || []).length;
    }
    fileReader.readAsText(file);
  }
}
