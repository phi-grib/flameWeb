import { Component, OnInit , ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { CommonService } from '../common.service';
import { ModelListService } from './model-list.service';
import { Model, Globals, Prediction, Manager } from '../Globals';
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
    public globals: Globals,
    public manage: Manager,
    private toastr: ToastrService) {}

  models: Array<any>;
  objectKeys = Object.keys;

  ngOnInit() {
    this.getModelList();
  }

  getModelList() {

    this.commonService.getModelList().subscribe(
        result => {
          // result = JSON.parse(result[1]);
          this.model.trained_models = [];
          for (const model of result) {
            const modelName = model.text;
            for ( const versionInfo of model.nodes) {
              let version = versionInfo.text;
              // CAST VERSION
              version = version.replace('ver', '');
              version = (version === 'dev') ? '0' : version;
              version = Number(version);
              // INFO OF EACH MODEL
              this.commonService.getModel(modelName, version).subscribe(
                result2 => {
                    const dict_info = {};
                    for (const info of result2) {
                      dict_info[info[0]] = info[2];
                    }
                    const quality = {};
                    for (const info of (Object.keys(dict_info))) {
                      if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') // HARCODED: NEED TO IMPROVE
                          && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                          && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                            quality[info] =  parseFloat(dict_info[info].toFixed(3));
                      }
                    }
                    this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: true,
                    numMols: dict_info['nobj'], variables: dict_info['nvarx'], type: dict_info['model'], quality: quality};
                    this.model.trained_models.push(modelName + ' .v' + version);
                },
                error => {
                 this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: false, numMols: '-',
                    variables: '-', type: '-', quality: {}};
                }
              );
            }
          }
        },
        error => {
          console.log(error.message);
          alert(error.message);
        }
    );
  }


  selectModel(name: string, version: string, trained: boolean, type: string) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    if (this.globals.actualTab === 'build') {
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
      this.prediction.trained = trained;

      this.prediction.quantitative = false;
      if (type.indexOf('quantitative') > -1 ) {
        this.prediction.quantitative = true;
      }
      if (type.indexOf('mean') >1 || type.indexOf('median')) {
        this.prediction.quantitative = true;
      }

      this.prediction.conformal = false;
      if (type.indexOf('conformal') > -1 && type.indexOf('combination') === -1) {
        this.prediction.conformal = true;
      }
      this.prediction.file = undefined;
      this.prediction.file_info = undefined;
      this.prediction.file_fields = undefined;
      this.prediction.result = undefined;
      this.prediction.predicting = false;
    }

    if (this.globals.actualTab === 'manage') {
      this.manage.name = name;
      this.manage.version = version;
    }
  }

  getParameters(): void {
    this.service.getParameters(this.model.name, this.model.version).subscribe(
      result => {
        this.model.parameters = result;
      },
      error => {
        alert(error.status + ' : ' + error.statusText);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
      }
    );
  }
}
