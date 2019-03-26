import { Component, OnInit } from '@angular/core';
import { ValidationsService } from './validations.service';
import {Model} from '../Model';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {

  constructor(private service: ValidationsService,
    public model: Model) { }

  ngOnInit() {

    this.getModel();
  
  }

  getModel() {
    this.service.getModel(this.model.name, this.model.version).subscribe(
      result2 => {
        if (result2[0]) { //True is trained
          console.log(JSON.parse(result2[1]));
        }
      },
      error => {
        alert('Error getting model');
      }
    );
  }
}
