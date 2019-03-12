import { Injectable } from '@angular/core';

@Injectable()
export class Model {
  name: string = undefined;   // Name of the model selected in the first step
  version: string = undefined; // Version of the model selected in the first step
  modelProps: {} = undefined;    // Model propierties of the model selected in the first step
  file: string = undefined;  // Name of file uploaded in the second step
  fileDetails: any = [];   // Details of the uploaded file in the second step. Actually
  fileExtension: string = undefined;
  molNumber: number = undefined;
  data: any = [];
  type: string = undefined; // Quantitative / Qualitative
  fileFields: any = []; // Headers of SDFile
  fileData: any = undefined;
  trained: boolean = false; // Model is already trained
  /*
  Delta parameters, empty by default, fills on clicking the parameters tab.
  When you change anything on the formulary, automatically changes the value for that key
  */
  parameters: {} = undefined;
}
