import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { BuildService } from './build.service';
import {ModalDialogService, IModalDialogSettings} from 'ngx-modal-dialog';
import {NewmodelComponent} from '../newmodel/newmodel.component';
import { SelectorMatcher } from '@angular/compiler';
import {Model} from '../Model';


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor(private service: BuildService, 
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    public model: Model,) { }

  models: Array<any>;
  modelSettings: IModalDialogSettings;

  ngOnInit() {

    this.getModelsInfo();
    this.models = [];

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
              this.models.push({name: modelName, version: version, trained: trained, numMols: dict_info['nobj'],
              variables: dict_info['nvarx'], type: dict_info['model']});
            }
          }
          else {
            this.models.push({name: modelName, version: version, trained: trained, numMols: '-',
              variables: '-', type: '-'});
          }
        }
      },
      error => {
        alert('Error getALL models');
      }

    );

  }

  /*getModels() {
    this.service.getAllModels().subscribe(
      result => {
        result = JSON.parse(result);
        for (const info of result) {
            for (const node of info.nodes) {
              this.service.getModelInfo(info.text, node.text).subscribe(
                result2 => {
                    let trained = false;
                    if (result2) {
                      trained = true;
                    }
                    result2 = JSON.parse(result2);
                    console.log(result2);
                    this.models.push({name: info.text, version: node.text, trained: trained});
                },
                error => {
                  alert('Error getALL each model');
                }
              );
            }
        }
    },
    error => {
        alert('Error getALL models');
    }

    );
  }*/

  selectModel(name: string, version: string) {

    if (version === '-' || version === 'dev') {
      version = '0';
    }
    this.model.name = name;
    this.model.version = version;


  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    /*const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createNewModel(this.modelName).subscribe(
            result => {
                if (result[0] === true) {
                    this.trainigseriesEnable = false;
                    this.modelEnable = false;
                    this.validationEnable = false;
                    this.trainserieElement.nativeElement.className = 'collapse show';
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
    }*/
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
