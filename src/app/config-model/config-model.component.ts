import { Component, OnInit } from '@angular/core';
import { Model} from '../Model';

@Component({
  selector: 'app-config-model',
  templateUrl: './config-model.component.html',
  styleUrls: ['./config-model.component.css']
})
export class ConfigModelComponent implements OnInit {

  constructor(public model: Model) { }

  objectKeys = Object.keys;

  infoModel = ['imbalance'];

  parametersModel = {
    RF: 'RF_parameters',
    PLSDA: 'PLSDA_parameters',
    PLSR: 'PLSR_parameters',
    GNB: 'GNB_parameters',
    SVM: 'SVM_parameters'
  };
  optimizeModel = {
    RF: 'RF_optimize',
    PLSDA: 'PLSDA_optimize',
    PLSR: 'PLSR_optimize',
    GNB: 'GNB_optimize',
    SVM: 'SVM_optimize'
  };
  ngOnInit() {
  }

}
