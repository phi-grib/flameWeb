import { Injectable } from '@angular/core';

@Injectable()
export class Model {
  name: string = undefined;   // Name of the model selected in the first step
  version: string = undefined; // Version of the model selected in the first step
  file: any = undefined;  // Name of file uploaded in the second step
  trained = false; // Model is already trained
  file_info = {}; //Info file ej. num mols, variables
  /*
  Delta parameters, empty by default, fills on clicking the parameters tab.
  When you change anything on the formulary, automatically changes the value for that key
  */
  parameters: any = undefined;
  delta: any = {};
  trainig_models = [];
  listModels = {};
}
