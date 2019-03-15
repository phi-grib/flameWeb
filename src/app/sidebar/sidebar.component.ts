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
    for (const key of Object.keys(this.model.parameters)) {
      dict_aux = this.model.parameters[key];
      for (const key2 of Object.keys(dict_aux)) {
        if (key2 === 'value' && this.isDict(dict_aux[key2])) {
          console.log(key + ' : ' + dict_aux[key2] + '  ---  ');
        }
        else {
          this.recursiveDelta(dict_aux[key2]);
        }

      }
    }

  }


  buildModel(): void {

    console.log(this.model.parameters);
    console.log(this.model.file);

   this.recursiveDelta(this.model.parameters);
    alert('creagted');

   /* this.service.buildModel().subscribe(
      result => {
        console.log(result);
        alert('OK');
      },
      error => {
        console.log(error);
        alert('error');
      }
    );*/
  }
}
