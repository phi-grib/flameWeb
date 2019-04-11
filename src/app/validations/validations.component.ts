import { Component, OnInit } from '@angular/core';
import {Model} from '../Model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {
  constructor(public model: Model,private commonService : CommonService) { }

  ngOnInit() {
    this.commonService.getModel(this.model.name, this.model.version).subscribe(
      result => {
        result = JSON.parse(result[1]);
        this.model.conformal = result[3][2].indexOf('conformal') === -1  ? false : true;
        this.model.quantitative = result[3][2].indexOf('quantitative') === -1 ? false : true;
      
      },
      error => {
      }
    );
  }

}