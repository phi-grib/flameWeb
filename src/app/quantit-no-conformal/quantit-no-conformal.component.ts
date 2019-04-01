import { Component, OnInit } from '@angular/core';
import { QuantitNoConformalService } from './quantit-no-conformal.service';
import {Model} from '../Model';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts'

@Component({
  selector: 'app-quantit-no-conformal',
  templateUrl: './quantit-no-conformal.component.html',
  styleUrls: ['./quantit-no-conformal.component.css']
})
export class QuantitNoConformalComponent implements OnInit {

  

  constructor(private service: QuantitNoConformalService,
    public model: Model) { }

  objectKeys = Object.keys;
  modelBuildInfo = {};
  modelValidationInfo = {};
  data: Array<any>;

  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };
  public scatterChartLabels: Label[] = [];

  public scatterChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Series A',
      pointRadius: 2,
    },
  ];
  public scatterChartType: ChartType = 'scatter';

  ngOnInit() {
    this.getValidation();
  }

  getValidation() {
    this.service.getValidation(this.model.name, this.model.version).subscribe(
      result => {
        if (result[0]) { // True is trained
          const info = JSON.parse(result[1]);
          console.log(info);
          for (const modelInfo of info['model_build_info']) {
            if (typeof modelInfo[2] === 'number') {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            this.modelBuildInfo [modelInfo[0]] = [modelInfo[1], modelInfo[2]];
          }
          for (const modelInfo of info['model_valid_info']) {
            console.log(typeof modelInfo[2]);
            if (typeof modelInfo[2] === 'number') {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            if (typeof modelInfo[2] !== 'object') {
              this.modelValidationInfo [modelInfo[0]] = [modelInfo[1], modelInfo[2]];
            }
          }


         
          setTimeout(() => {
            // tslint:disable-next-line:forin
            for (const i in info['ymatrix']) {
              this.scatterChartData[0].data[i] = { x: info['ymatrix'][i], y: info['Y_pred'][i]};
              this.scatterChartLabels[i] = info['obj_nam'][i];
            }
          }, 50);
        }
      },
      error => {
        alert('Error getting model');
      }
    );
  }

}
