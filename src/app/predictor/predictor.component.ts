import { Component, OnInit, OnChanges } from '@angular/core';
import { Prediction } from '../Globals';
import { PredictorService } from './predictor.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit, OnChanges {

  constructor(public prediction: Prediction,
              public service: PredictorService,
              private router: Router) { }

  ngOnInit() {
  }
  ngOnChanges() {
    $('#options a:first-child').tab('show') // Select first tab
  }

  predict() {
    this.prediction.predicting = true;
    this.service.predict().subscribe(
      result => {
        if (result.buildStatus[0]) {
          this.prediction.result = JSON.parse(result.buildStatus[1]);
          console.log(this.prediction.result);
          $('#options a:last-child').tab('show'); // Select first tab
          this.router.navigate(['/prediction']);
        }
      },
      error => {
      }
    );
  }
}