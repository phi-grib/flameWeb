import { Component, OnInit } from '@angular/core';
import { ValidationsService } from './validations.service';
import {Model} from '../Model';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {

  constructor(private service: ValidationsService,
    public model: Model) { }

    objectKeys = Object.keys;
    modelBuildInfo = {};
    modelValidationInfo = {};
    // PolarArea
    public polarAreaChartLabels: Label[] = ['TP', 'FP', 'FN', 'TN'];
    public polarAreaChartData: SingleDataSet = [0, 0, 0, 0];
    public polarAreaLegend = true;
    public polarAreaChartType: ChartType = 'polarArea';

  ngOnInit() {

    this.getValidation();
  
  }

  getValidation() {
    this.service.getValidation(this.model.name, this.model.version).subscribe(
      result => {
        if (result[0]) { //True is trained
          let info = JSON.parse(result[1]);
          console.log(info);
          for (let modelInfo of info['model_build_info']) {
            if (typeof modelInfo[2] === "number") {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            this.modelBuildInfo [modelInfo[0]]= [modelInfo[1],modelInfo[2]];
          }
          for (let modelInfo of info['model_valid_info']) {
            console.log(typeof modelInfo[2]);
            if (typeof modelInfo[2] === "number") {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            if (typeof modelInfo[2] !== 'object') {
              this.modelValidationInfo [modelInfo[0]]= [modelInfo[1],modelInfo[2]];
            }
          }
          setTimeout(() => {
            this.polarAreaChartData = [this.modelValidationInfo['TP'][1], this.modelValidationInfo['FP'][1], 
            this.modelValidationInfo['FN'][1], this.modelValidationInfo['TN'][1]];
          },50);
        }
      },
      error => {
        alert('Error getting model');
      }
    );
  }
}
