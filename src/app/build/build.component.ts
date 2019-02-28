import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { BuildService } from './build.service';
import {ModalDialogService} from 'ngx-modal-dialog'
import {NewmodelComponent} from "../newmodel/newmodel.component"


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor(private service: BuildService, private modalService: ModalDialogService, private viewRef: ViewContainerRef) { }

  models:Array<any>
  ngOnInit() {

    this.getModels()
    this.models=[]

  }

  getModels(){

    this.service.getAllModels().subscribe(
      result => {
        result = JSON.parse(result);
        for (let info of result){
          
            for (let node of info.nodes){
              
              this.service.getModelInfo(info.text,node.text).subscribe(
                result=>{
                    let trained=false
                    if (result){
                      trained=true 
                    }
                   
                    this.models.push({name:info.text,version:node.text,trained:trained})
                },
                error =>{
                  alert("Error getALL each model")
                }
              );
            }
        }
        
    },
    error => {
        alert("Error getALL models")
    }

    );
  }
  openModel(){
    alert("Open model windows to VIEW model")
  }
  newModel(){
    this.modalService.openDialog(this.viewRef, {
      title: 'Some modal title',
      childComponent: NewmodelComponent
    });
  }
}
