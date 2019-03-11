import { Component, OnInit, ComponentRef, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {IModalDialog, IModalDialogOptions, IModalDialogButton} from 'ngx-modal-dialog';
import {ParametersService} from './parameters.service';
import { Model } from '../Model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  @ViewChild('trainigseries') trainserieElement: ElementRef;
  actionButtons: IModalDialogButton[];
  modelName = '';
  trainigseriesEnable = true;
  modelEnable = true;
  validationEnable = true;
  trainigseriesCollapsed = true;

  constructor(private service: ParametersService, private model: Model) {}
 
  ngOnInit() {

    this.getParameters();

  }

  getParameters(): void {
    this.service.getParameters(this.model.name).subscribe(
      result => {
       result = JSON.parse(result);
       this.model.parameters = result;
       console.log(result);
        /////////////////////////////////

        ////////////////////////////////
      },
      error => {
        console.log(error);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
      }
    );
  }

}
