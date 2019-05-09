import { Injectable } from '@angular/core';

@Injectable()
export class Model {
  name: string = undefined;   // Name of the model selected in the first step
  version: string = undefined; // Version of the model selected in the first step
  file: any = undefined;  // Name of file uploaded in the second step
  type: string;
  trained = false; // Model is already trained
  file_info = undefined; // Info file ej. num mols, variables
  file_fields = undefined;
  quantitative: boolean = undefined;
  conformal: boolean = undefined;
  /*
  Delta parameters, empty by default, fills on clicking the parameters tab.
  When you change anything on the formulary, automatically changes the value for that key
  */
  parameters: any = undefined;
  delta: any = {};
  trainig_models = [];
  listModels = {};
}

@Injectable()
export class Prediction {
    name: string = undefined;   // Name of the model selected in the first step
    version: string = undefined; // Version of the model selected in the first step
    trained = false; // Model is already trained
    file: any = undefined;  // Name of file uploaded in the second step
    file_info = undefined; // Info file ej. num mols, variables
    file_fields = undefined;
    result = undefined;
    predicting = false;
}

@Injectable()
export class Manager {
    name: string = undefined;   // Name of the model selected in the first step
    version: string = undefined; // Version of the model selected in the first step
}

@Injectable()
export class Globals {
    actualTab = 'build';
}