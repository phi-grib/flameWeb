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
    this.service.getParameters(this.model.name, this.model.version).subscribe(
      result => {
        if (result[0]) {
          this.model.parameters = result = JSON.parse(result[1]);
        }

        /////////////////////////////////

        ////////////////////////////////
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
