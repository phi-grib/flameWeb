import { Component, OnInit } from '@angular/core';
import { Prediction } from '../Global';
import { PredictorService } from './predictor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit {

  constructor(public prediction: Prediction, public service: PredictorService) { }

  ngOnInit() {
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
