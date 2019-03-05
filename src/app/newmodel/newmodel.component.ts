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
  modelName:string="";

  constructor(private service: NewmodelService) {
    this.actionButtons = [
      { text: 'Close' }, // no special processing here
      { text: 'I will always close', onAction: () => true },
      { text: 'Train', onAction: () => false }
    ];
  }
  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
    // no processing needed
  }

  ngOnInit() {


  }

 
    /**
     * Creates a new model with the given name and informs the user with a toastr
     */
    createModel(): void {
      const letters = /^[A-Za-z0-9_]+$/;
      alert(this.modelName)
      if (this.modelName.match(letters)) {
          this.service.createNewModel(this.modelName).subscribe(
              result => {
                  if (result[0] === true) {
                      alert("Created")
                  } else {
                      alert("ERROR1")
                  }
              },
              error => {
                 alert("ERROR2")
              },
              () => {
                 alert("no se que ha pasado")
              }
          );
      } else {
          alert("Invalid name");
      }
  

  }

}
