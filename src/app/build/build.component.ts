import { Component, OnInit , ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { BuildService } from './build.service';
import { Router } from '@angular/router';
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
    private router: Router,
    public model: Model,
    private toastr: ToastrService) { }

  models: Array<any>;
  modelName: string;
  objectKeys = Object.keys;

  ngOnInit() {
    this.models = [];
    //this.getModelsInfo();
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
              version = (version === 'dev') ? '0' : version;

              //INFO OF EACH MODEL
              this.service.getModel(modelName, version).subscribe(
                result2 => {
                  if (result2[0]) {
                    trained = true;
                    const dict_info = {};
                    for ( const info of JSON.parse(result2[1])) {
                      dict_info[info[0]] = info[2];
                    }
                    for ( const info of Object.keys(dict_info)) {
                      if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') //HARCODED: NEED TO IMPROVE
                          && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                          && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                            quality[info] = dict_info[info].toFixed(3);
                      }
                    }
                    this.models.push({name: modelName, version: version, trained: trained, numMols: dict_info['nobj'],
                    variables: dict_info['nvarx'], type: dict_info['model'], quality: quality});

                  }
                  else{
                    this.models.push({name: modelName, version: version, trained: trained, numMols: '-',
                    variables: '-', type: '-', quality: {}});
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
          alert('Error getALL models');
        }
    );
  }


  /*getModelsInfo() {

    this.service.getAll().subscribe(
      result => {
        result = JSON.parse(result);
       
        for (const model of result) {
          const modelName = model[0];
          let version = '-';
          let trained = false;
          const quality = {};
         
          if (model[1].length > 0) {
            for (const versions of model[1]) {
              trained =  true;
              version = versions[0];
              version = (version == '0') ? 'dev' : version;
              const dict_info = {};
              for ( const info of versions[1]) {
                dict_info[info[0]] = info[2];
              }
              for ( const info of Object.keys(dict_info)) {
                if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') //HARCODED: NEED TO IMPROVE
                    && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                    && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {

                      quality[info] = dict_info[info].toFixed(3);
                }
              }
              this.models.push({name: modelName, version: version, trained: trained, numMols: dict_info['nobj'],
              variables: dict_info['nvarx'], type: dict_info['model'], quality: quality});
            }
          }
          else {
            this.models.push({name: modelName, version: version, trained: trained, numMols: '-',
              variables: '-', type: '-', quality: {}});
          }
        }
      },
      error => {
        alert('Error getALL models');
      }

    );

  }*/

  selectModel(name: string, version: string, trained: boolean) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    this.model.name = name;
    this.model.version = version;
    this.model.trained = trained;

  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createModel(this.modelName).subscribe(
            result => {
              this.toastr.success('Model ' + this.modelName + ' created', 'Success', { closeButton: true});
              if (result.status[0] === true) {
                this.modelName = '';
                this.models = [];
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
}
