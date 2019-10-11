import { Component, OnInit } from '@angular/core';
import {Model} from '../Globals';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {
  constructor(public model: Model, private commonService: CommonService) { }

  ngOnInit() {

    //const type = this.model.listModels[this.model.name + '-' + this.model.version].type;
    //this.model.conformal = type.indexOf('conformal') === -1  ? false : true;
    //this.model.quantitative = type.indexOf('quantitative') === -1 ? false : true;
    alert(this.model.parameters.conformal.value);
    alert(this.model.parameters.quantitative.value);
    this.model.conformal = this.model.parameters.conformal.value;
    this.model.quantitative = this.model.parameters.quantitative.value;

  }
}
