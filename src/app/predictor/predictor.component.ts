import { Component, OnInit, OnChanges } from '@angular/core';
import { Prediction } from '../Globals';
import { PredictorService } from './predictor.service';
declare var $: any;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit, OnChanges {

  constructor(public prediction: Prediction, public service: PredictorService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    $('#options a:first-child').tab('show') // Select first tab
  }

  predict(){
    this.service.predict().subscribe(
      result => {
        if (result.buildStatus[0]) {
          this.prediction.result = JSON.parse(result.buildStatus[1]);
          console.log(this.prediction.result);
        }
      },
      error => {
      }
    );
  }
}
