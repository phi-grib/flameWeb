import { Component, OnInit , ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { CommonService } from '../common.service';
import { ModelListService } from './model-list.service';
import { Model, Globlas, Prediction } from '../Global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {

  constructor(private service: ModelListService,
    private commonService: CommonService,
    private viewRef: ViewContainerRef,
    public model: Model,
    public prediction: Prediction,
    public globals: Globlas,
    private toastr: ToastrService) {}

  models: Array<any>;
  modelName: string;
  objectKeys = Object.keys;

  ngOnInit() {
    this.model.listModels = {};
    this.getModelList();
  }

  getModelList() {

    this.commonService.getModelList().subscribe(
        result => {
          result = JSON.parse(result[1]);
          for (const model of result) {
            const modelName = model.text;
            let trained = false;
            for ( const versionInfo of model.nodes) {
              let version = versionInfo.text;
              // CAST VERSION
              version = version.replace('ver', '');
              version = (version === 'dev') ? '0' : version;
              version = Number(version);
              // INFO OF EACH MODEL
              this.commonService.getModel(modelName, version).subscribe(
                result2 => {
                  if (result2[0]) { // True is trained
                    trained = true;
                    const dict_info = {};
                    for ( const info of JSON.parse(result2[1])) {
                      dict_info[info[0]] = info[2];
                    }
                    const quality = {};
                    for ( const info of (Object.keys(dict_info))) {
                      if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') // HARCODED: NEED TO IMPROVE
                          && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                          && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                            quality[info] =  parseFloat(dict_info[info].toFixed(3));
                      }
                    }
                    this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: trained,
                    numMols: dict_info['nobj'], variables: dict_info['nvarx'], type: dict_info['model'], quality: quality};

                  } else {
                    this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: trained, numMols: '-',
                    variables: '-', type: '-', quality: {}};
                  }
                },
                error => {
                  alert('Error getting model');
                }
              );
            }
          }
        },
        error => {
          console.log(error.message)
          alert(error.message);
        }
    );
  }


  selectModel(name: string, version: string, trained: boolean,type: string) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    alert(this.globals.actualTab);
    if (this.globals.actualTab === 'builder') {
      this.model.name = name;
      this.model.version = version;
      this.model.trained = trained;
      this.model.type = type;
      this.model.file = undefined;
      this.model.file_info = undefined;
      this.model.file_fields = undefined;
      this.model.parameters = undefined;
      this.getParameters();
    }

    if (this.globals.actualTab === 'predict') {
      this.prediction.name = name;
      this.prediction.version = version;
      this.prediction.file = undefined;
      this.prediction.file_info = undefined;
      this.prediction.file_fields = undefined;
    }
  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createModel(this.modelName).subscribe(
          result => {
            if (result.status[0] === true) {
              this.modelName = '';
              this.getModelList();
              this.toastr.success('Model ' + this.modelName, 'CREATED', {
                timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
              });
            } else {
              this.toastr.error('Model ' + this.modelName + ' ' + result.status[1], 'ERROR', {
                timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
              });
            }
          },
          error => {
            console.log(error);
              alert('ERROR2');
              this.toastr.error(error.error, 'ERROR', {
                timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
              });
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
       alert('Error cloning')
      }
    );
  }

  getParameters(): void {
    this.service.getParameters(this.model.name, this.model.version).subscribe(
      result => {
        if (result[0]) {
          this.model.parameters = result = JSON.parse(result[1]);
          console.log(this.model.parameters);
        }
      },
      error => {
        console.log(error);
        alert(error.status + ' : ' + error.statusText);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
      }
    );
  }
}
