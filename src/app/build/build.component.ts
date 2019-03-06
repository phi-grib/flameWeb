import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { BuildService } from './build.service';
import {ModalDialogService, IModalDialogSettings} from 'ngx-modal-dialog';
import {NewmodelComponent} from '../newmodel/newmodel.component';


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor(private service: BuildService, private modalService: ModalDialogService, private viewRef: ViewContainerRef) { }

  models: Array<any>;
  modelSettings: IModalDialogSettings;

  ngOnInit() {

    this.getModels();
    this.models = [];

  }

  getModels() {
    this.service.getAllModels().subscribe(
      result => {
        result = JSON.parse(result);
        for (const info of result) {
            for (const node of info.nodes) {
              this.service.getModelInfo(info.text,node.text).subscribe(
                result2 => {
                    let trained = false;
                    if (result2) {
                      trained = true;
                    }
                    this.models.push({name: info.text, version: node.text, trained: trained})
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
  }

  viewModel() {
    alert('VIEW model validation');
  }
  createVersion(){
    alert("Create new version")
  }
  deleteModel(){
    alert("DELETE model")
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
