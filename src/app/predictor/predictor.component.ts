import { Component, OnInit } from '@angular/core';
import { Prediction } from '../Global';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit {

  constructor(public prediction: Prediction) { }

  ngOnInit() {
  }
}
