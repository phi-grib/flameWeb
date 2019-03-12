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
  infoSDF = {
    sdf: ['SDFile_name', 'SDFile_activity', 'SDFile_experimental'],
    tsv: ['TSV_objnames', 'TSV_activity', 'TSV_varnames']
  };

  infoSeries = ['input_type', 'SDFile_name', 'SDFile_activity', 'SDFile_experimental', 'model_set', 'normalize_method', 'computeMD_method',
                'convert3D_method', 'ext_input', 'feature_selection', 'feature_number', 'imbalance', 'ionize_method', 'mol_batch',
                'modelAutoscaling', 'quantitative'];

  ngOnInit() {
  }

}
