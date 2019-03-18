import { Component, OnInit } from '@angular/core';
import { Model } from '../Model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model, private service: SidebarService ) { }

  ngOnInit() {
  }



  private isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
  }

  private recursiveDelta(dict_in: {}) {

    let dict_aux = {};
    let dict_out = {}
    for (const key of Object.keys(dict_in)) {
      dict_aux = dict_in[key];
      for (const key2 of Object.keys(dict_aux)) {
        if (key2 === 'value' ){
          if (this.isDict(dict_aux[key2])) {
            dict_out[key] = this.recursiveDelta(dict_aux[key2]);
          }
          else {
            dict_out[key] = dict_aux[key2];
          }
        }  
      }
    }
    return dict_out;
  }

  buildModel(): void {

    console.log(this.model.parameters);
    console.log(this.model.file);

    this.model.delta = {}
    this.model.delta = this.recursiveDelta(this.model.parameters);
    this.service.buildModel().subscribe(
      result => {
        console.log(result);
        alert('OK');
      },
      error => {
        console.log(error);
        alert('error');
      }
    );
  }
}
