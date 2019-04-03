import { Component, OnInit } from '@angular/core';
import { QuantitConformalService } from './quantit-conformal.service';
import {Model} from '../Model';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import 'chartjs-plugin-error-bars';

@Component({
  selector: 'app-quantit-conformal',
  templateUrl: './quantit-conformal.component.html',
  styleUrls: ['./quantit-conformal.component.css']
})
export class QuantitConformalComponent implements OnInit {


  constructor(private service: QuantitConformalService,
    public model: Model) { }
    objectKeys = Object.keys;
    modelBuildInfo = {};
    modelValidationInfo = {};
    modelConformal = {};
    data: Array<any>;
  
    // Options
    public ChartOptionsPredicted: ChartOptions = {
      responsive: true,
      tooltips: {
        callbacks: {
           label: function(tooltipItem, data) {
              return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
           },
           title: function(tooltipItem, data) {
            const label = data.labels[tooltipItem[0].index];
            return label;
           }
        }
      },
     scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'experimental'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Predicted'
          }
        }]
      },
      legend: {
        display: false
      }
    };
    public ChartOptionsFitted: ChartOptions = {
      responsive: true,
      tooltips: {
        callbacks: {
           label: function(tooltipItem, data) {
              return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
           },
           title: function(tooltipItem, data) {
            const label = data.labels[tooltipItem[0].index];
            return label;
           }
        }
      },
     scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'experimental'
          }
        }],
        yAxes: [{
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Fitted'
          }
        }]
      },
      legend: {
        display: false
      },
      plugins: {
        chartJsPluginErrorBars: {
          /**
           * stroke color, or array of colors
           * @default: derived from borderColor
           */
          color: '#666',
  
          lineWidth: 2 | '2px',
  
          /**
           * whether to interpet the plus/minus values, relative to the value itself (default) or absolute
           * @default false
           */
          absoluteValues: false
        }
      }
    };
  
    public ChartLabels: Label[] = [];
  
    public ChartDataPredicted: ChartDataSets[] = [
      {
        data: [],
        pointRadius: 3,
        backgroundColor: 'rgba(255,0,0,0.3)',
        type: 'scatter',
        showLine: false,
        fill: false,
      },
      {
        data: [],
        type: 'line',
        fill: false,
        pointRadius: 1
      },
    ];
  
    public ChartDataFitted: any[] = [
      {
        data: [],
        pointRadius: 3,
        showLine: false,
        fill: false,
        errorBars : {}
      },
      {
        data: [],
        fill: false,
        pointRadius: 1
      },
    ];
  
    public ChartType: ChartType = 'line';
  
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
              else{
                this.modelConformal[modelInfo[0]] = modelInfo[2];
              }
            }
            console.log(this.modelConformal);
  
            setTimeout(() => {
              // tslint:disable-next-line:forin
              for (const i in info['ymatrix']) {
                //this.ChartDataPredicted[0].data[i] = { x: info['ymatrix'][i], y: info['Y_pred'][i]};
                //this.ChartDataPredicted[1].data[i] = { x: info['ymatrix'][i], y: info['ymatrix'][i]};
                this.ChartDataFitted[0].data[i] = { x: info['ymatrix'][i], y: this.modelConformal['Conformal_interval_medians'][i]};
                this.ChartDataFitted[0].errorBars[info['obj_nam'][i]] = {plus:1, minus:1}
                //{ plus: this.modelConformal['Conformal_prediction_ranges'][i][0] - this.modelConformal['Conformal_interval_medians'][i],
                //minus: this.modelConformal['Conformal_prediction_ranges'][i][1] - this.modelConformal['Conformal_interval_medians'][i]};
                this.ChartDataFitted[1].data[i] = { x: info['ymatrix'][i], y: info['ymatrix'][i]};

                this.ChartLabels[i] = info['obj_nam'][i];
                
              }
              console.log(this.ChartDataFitted);
            }, 50);
          }
        },
        error => {
          alert('Error getting model');
        }
      );
    }
}
