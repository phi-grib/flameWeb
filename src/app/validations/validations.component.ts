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
    this.model.conformal = this.model.parameters.conformal.value;
    this.model.quantitative = this.model.parameters.quantitative.value;
  }
}
