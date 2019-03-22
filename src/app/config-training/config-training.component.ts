import { Component, OnInit } from '@angular/core';
import { Model} from '../Model';


@Component({
  selector: 'app-config-training',
  templateUrl: './config-training.component.html',
  styleUrls: ['./config-training.component.css']
})
export class ConfigTrainingComponent implements OnInit {

  constructor(private model: Model) { }

  objectKeys = Object.keys;

  infoSeries = {
    'molecule': ['SDFile_name', 'SDFile_activity', 'SDFile_experimental', 'quantitative', 'normalize_method',
     'computeMD_method', 'convert3D_method', 'ext_input', 'ionize_method', 'modelAutoscaling'],
    'data': ['TSV_objnames', 'TSV_activity', 'TSV_varnames']
  };


  ngOnInit() {


  }

}
