import { Component, OnInit, ComponentRef } from '@angular/core';
import {IModalDialog, IModalDialogOptions, IModalDialogButton} from 'ngx-modal-dialog'
import {NewmodelService} from './newmodel.service'

@Component({
  selector: 'app-newmodel',
  templateUrl: './newmodel.component.html',
  styleUrls: ['./newmodel.component.css']
})
export class NewmodelComponent implements OnInit, IModalDialog {

  actionButtons: IModalDialogButton[];
 
  constructor(private service: NewmodelService) {
    this.actionButtons = [
      { text: 'Close' }, // no special processing here
      { text: 'I will always close', onAction: () => true },
      { text: 'I never close', onAction: () => false }
    ];
  }
 
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
  }

  ngOnInit() {


  }

}
