import { Component, OnInit , ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { BuildService } from './build.service';
import {Model} from '../Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor(private service: BuildService,
    private viewRef: ViewContainerRef,
    public model: Model,
    private toastr: ToastrService) {}

  models: Array<any>;
  modelName: string;
  objectKeys = Object.keys;

  ngOnInit() {
    this.model.listModels = {};
    this.getModelList();
  }

  getModelList() {

    this.service.getModelList().subscribe(
        result => {
          result = JSON.parse(result[1]);
          for (const model of result) {
            const modelName = model.text;
            let trained = false;
            const quality = {};
            for ( const versionInfo of model.nodes) {
              let version = versionInfo.text;
              //CAST VERSION
              version = version.replace('ver', '');
              version = (version === 'dev') ? '0' : version;
              version = Number(version);
              //INFO OF EACH MODEL
              this.service.getModel(modelName, version).subscribe(
                result2 => {
                  if (result2[0]) { //True is trained
                    trained = true;
                    const dict_info = {};
                    for ( const info of JSON.parse(result2[1])) {
                      dict_info[info[0]] = info[2];
                    }
                    for ( const info of (Object.keys(dict_info))) {
                      if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') //HARCODED: NEED TO IMPROVE
                          && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                          && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                            quality[info] =  parseFloat(dict_info[info].toFixed(3));
                           
                      }
                    }
                    this.model.listModels[modelName + '-' + version]={name: modelName, version: version, trained: trained, numMols: dict_info['nobj'],
                    variables: dict_info['nvarx'], type: dict_info['model'], quality: quality};

                  }
                  else{
                    this.model.listModels[modelName + '-' + version]={name: modelName, version: version, trained: trained, numMols: '-',
                    variables: '-', type: '-', quality: {}};
                  }
                },
                error => {
                  alert('Error getting model');
                }
              );
            }
          }
          this.model.listModels;
        },
        error => {
          alert('Error getALL models');
        }
    );
  }


  selectModel(name: string, version: string, trained: boolean) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    this.model.name = name;
    this.model.version = version;
    this.model.trained = trained;
    this.model.file = undefined;
    this.model.file_info = undefined;
    this.model.file_fields = undefined;
    this.model.parameters = undefined;

  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createModel(this.modelName).subscribe(
          result => {
            //this.toastr.success('Model ' + this.modelName + ' created', 'Success', { closeButton: true});
            if (result.status[0] === true) {
              this.modelName = '';
              this.model.listModels = {};
              this.getModelList();
            } else {
                alert('ERROR1');
            }
          },
          error => {
              alert('ERROR2');
          }
        );
    } else {
        alert('Invalid name');
    }
  }

  deleteModel() {

    this.service.deleteModel(this.model.name).subscribe(
      result => {
        this.toastr.success( 'Model ' +this.model.name+ ' deleted','DELETED',{
          timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
        });
        this.model.name = undefined ;
        this.model.version = undefined;
        this.model.trained = undefined;
        this.model.file = undefined;
        this.model.file_info = undefined;
        this.model.file_fields = undefined;
        this.model.parameters = undefined;
        this.model.listModels = {};
        this.getModelList();
      },
      error => {
        alert('Delete ERROR');
      }
    );
  }

  deleteVersion() {

    this.service.deleteVersion(this.model.name, this.model.version).subscribe(
      result => {
        this.toastr.success( 'Model ' + this.model.name + '.v' + this.model.version + ' deleted','DELETED', {
          timeOut: 4000, positionClass: 'toast-top-right'
        });
        this.model.listModels = {};
        this.getModelList();
      },
      error => {
        console.log(error);
        this.toastr.error( 'Model ' + this.model.name + '.v' + this.model.version + ' NOT deleted', 'ERROR',{
          timeOut: 4000, positionClass: 'toast-top-right'
        });
      }
    );

  }

  cloneModel() {

    this.service.cloneModel(this.model.name).subscribe(

      result => {
        this.model.listModels = {};
        this.getModelList();
      },
      error => {
       alert("Error cloning")
      }
    );
  }
}
