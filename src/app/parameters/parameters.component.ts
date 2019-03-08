import { Component, OnInit, ComponentRef, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {IModalDialog, IModalDialogOptions, IModalDialogButton} from 'ngx-modal-dialog';
import {ParametersService} from './parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, OnChanges {

  @ViewChild('trainigseries') trainserieElement: ElementRef;
  actionButtons: IModalDialogButton[];
  modelName = '';
  trainigseriesEnable = true;
  modelEnable = true;
  validationEnable = true;
  trainigseriesCollapsed = true;

  constructor(private service: ParametersService) {}
 
  ngOnInit() {


  }

  ngOnChanges() {
    alert('Changes');
  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
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
                this.getParameters();
            }
        );
    } else {
        alert('Invalid name');
    }
  }

  getParameters(): void{
    this.service.getParameters(this.modelName).subscribe(
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
    );
  }

}
