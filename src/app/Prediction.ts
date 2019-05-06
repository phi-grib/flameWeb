import { Injectable } from '@angular/core';

@Injectable()
export class Prediction {
    name: string = undefined;   // Name of the model selected in the first step
    version: string = undefined; // Version of the model selected in the first step
    file: any = undefined;  // Name of file uploaded in the second step
    file_info = undefined; //Info file ej. num mols, variables
    file_fields = undefined;
    /*
    Delta parameters, empty by default, fills on clicking the parameters tab.
    When you change anything on the formulary, automatically changes the value for that key
    */
    results = [];
}
@Injectable()
export class Globlas {
    actualTab: string;
}
