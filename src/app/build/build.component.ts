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
    this.getModelsInfo();
  }

  getModelsInfo() {

    this.service.getAll().subscribe(
      result => {
        result = JSON.parse(result);
        console.log(result);
        /*Models*/
        for (const model of result) {
          const modelName = model[0];
          let version = '-';
          let trained = false;
          const quality = {};
          /*Models trained*/
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

                      quality[info] = dict_info[info];
                }
              }
              console.log(quality); 
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

  }

  selectModel(name: string, version: string) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    this.model.name = name;
    this.model.version = version;

    this.service.getParameters(name).subscribe(
      result => {
       console.log(JSON.parse(result));
      },
      error => {
        console.log(error);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
        console.log('Hola');
      }
    );

  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createNewModel(this.modelName).subscribe(
            result => {
              this.toastr.success('Model ' + this.modelName + ' created', 'Success', { closeButton: true});
              if (result[0] === true) {
                this.modelName = '';
                this.models = [];
                this.getModelsInfo();
              } else {
                  //alert('ERROR1');
              }
            },
            error => {
                //alert('ERROR2');
            },
            () => {
                //alert('no se que ha pasado');
                //this.getParameters();
            }
        );
    } else {
        alert('Invalid name');
    }
  }

  getParameters(): void{
   /* this.service.getParameters(this.modelName).subscribe(
      result => {
       console.log(JSON.parse(result));
      },
      error => {
        console.log(error);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
        alert('Hola');
      }
    );*/
  }
}
