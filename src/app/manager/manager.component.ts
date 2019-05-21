import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory } from '@angular/core';
import { Manager, Model } from '../Globals';
import { CommonService } from '../common.service';
import { ManagerService } from './manager.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';;

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  modelName: string;
  objectKeys = Object.keys;

  constructor(public manage: Manager,
              private commonService: CommonService,
              public service: ManagerService,
              public model: Model,
              private toastr: ToastrService) { }


  ngOnInit() {
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

    this.service.deleteModel(this.manage.name).subscribe(
      result => {
        this.toastr.success( 'Model ' + this.manage.name + ' deleted', 'DELETED' , {
          timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
        });
        for (const key of this.objectKeys(this.model.listModels)) {
          if (key.indexOf(this.manage.name) === 0) {
            delete this.model.listModels[key];
          }
        }
        this.manage.name = undefined ;
        this.manage.version = undefined;
      },
      error => {
        alert('Delete ERROR');
      }
    );
  }

  deleteVersion() {

    this.service.deleteVersion(this.manage.name, this.manage.version).subscribe(
      result => {
        this.toastr.success( 'Model ' + this.manage.name + '.v' + this.manage.version + ' deleted','DELETED', {
          timeOut: 4000, positionClass: 'toast-top-right'
        });
        delete this.model.listModels[this.manage.name + '-' + this.manage.version];
      },
      error => {
        console.log(error);
        this.toastr.error( 'Model ' + this.manage.name + '.v' + this.manage.version + ' NOT deleted', 'ERROR',{
          timeOut: 4000, positionClass: 'toast-top-right'
        });
      }
    );

  }

  cloneModel() {

    this.service.cloneModel(this.manage.name).subscribe(

      result => {
        // this.model.listModels = {};
        this.getModelList();
      },
      error => {
       alert('Error cloning');
      }
    );
  }

  exportModel() {
    const url: string = environment.baseUrl_manage + 'models/' + this.manage.name + '/export';
    window.open(url);
    /*this.service.exportModel(this.manage.name).subscribe(
      result => {
        console.log(result);
        const blob = new Blob([result], { type: 'application/tgz' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.log('--------------------');
        console.log('Error getting model');
        console.log(error);
        console.log('--------------------');
      }
    );*/
  }

  importModel(fileList: FileList) {
    const file = fileList[0];
    this.manage.file = file;
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
          console.log(error.message);
          alert(error.message);
        }
    );
  }
}
