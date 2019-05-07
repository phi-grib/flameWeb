import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Model } from '../Global';
import { BuilderService } from './builder.service';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit, OnChanges {

  constructor(public model: Model,
    private service: BuilderService,
    private commonService: CommonService,
    private router: Router,
    private toastr: ToastrService ) { }

  @Input() tabChange;
  ngOnInit() {
  }
  ngOnChanges(){
    $('#options a:first-child').tab('show') // Select first tab
  }

  private isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
  }

  private recursiveDelta(dict_in: {}) {

    let dict_aux = {};
    const dict_out = {}
    for (const key of Object.keys(dict_in)) {
      dict_aux = dict_in[key];
      for (const key2 of Object.keys(dict_aux)) {
        if (key2 === 'value' ){
          if (this.isDict(dict_aux[key2])) {
            dict_out[key] = this.recursiveDelta(dict_aux[key2]);
          }
          else {
            if (dict_aux[key2] === '') {
              dict_aux[key2] = null;
            }
            dict_out[key] = dict_aux[key2];
          }
        }
      }
    }
    return dict_out;
  }

  buildModel(name, version): void {

    this.model.delta = {};
    this.model.delta = this.recursiveDelta(this.model.parameters);
    console.log(this.model.delta);
    this.model.trainig_models.push(name + '-' + version);
    const inserted = this.toastr.info('Running!', 'Model ' + name + '.v' + version , {
      disableTimeOut: true, positionClass: 'toast-top-right'});

    this.service.buildModel().subscribe(
      result => {
        //delete model from training models
        const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
        if (index > -1) {
          this.model.trainig_models.splice(index, 1);
        }
        this.toastr.clear(inserted.toastId);
        this.getModelList();
        if (result.buildStatus[0]) {
          this.model.listModels[name + '-' + version].trained = true;
          this.toastr.success('Model ' + this.model.name + '.v' + this.model.version , 'CREATED SUCCESFULLY',{
            timeOut: 5000, positionClass: 'toast-top-right'});
        }
        else{
          this.toastr.error('Model ' + this.model.name + '.v' + this.model.version + ' \n ' + result.buildStatus[1] ,  'ERROR', {
            timeOut: 10000, positionClass: 'toast-top-right'});
        }
      },
      error => {
        const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
        if (index > -1) {
          this.model.trainig_models.splice(index, 1);
        }
        this.toastr.clear(inserted.toastId);
        this.toastr.error( 'Model ' + this.model.name + '.v' + this.model.version + ' \n ' + error.error.buildStatus , 'ERROR!', {
          timeOut: 10000, positionClass: 'toast-top-right'});
      }
    );
    this.router.navigate(['/']);
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
              //CAST VERSION
              version = version.replace('ver', '');
              version = (version === 'dev') ? '0' : version;
              version = Number(version);
              //INFO OF EACH MODEL
              this.commonService.getModel(modelName, version).subscribe(
                result2 => {
                  if (result2[0]) { //True is trained
                    trained = true;
                    const dict_info = {};
                    for ( const info of JSON.parse(result2[1])) {
                      dict_info[info[0]] = info[2];
                    }
                    const quality = {};
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
          console.log(error.message)
          alert(error.message);
        }
    );
  }
}
