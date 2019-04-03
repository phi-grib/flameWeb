import { Component, OnInit } from '@angular/core';
import {  Label } from 'ng2-charts';
import { Model } from '../Model';
import { ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import { QualitConformalService } from './qualit-conformal.service';

@Component({
  selector: 'app-qualit-conformal',
  templateUrl: './qualit-conformal.component.html',
  styleUrls: ['./qualit-conformal.component.css']
})
export class QualitConformalComponent implements OnInit {

  constructor(private service: QualitConformalService,
    public model: Model) { }
  
  ngOnInit() {
    this.getValidation();
  }

  getValidation() {
    this.service.getValidation(this.model.name, this.model.version).subscribe(
      result => {
        if (result[0]) { // True is trained
          const info = JSON.parse(result[1]);
          console.log(info);
        }
       
      },
      error => {
        alert('Error getting model');
      }
    );
  }
}
