import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Prediction } from '../Globals';
import * as SmilesDrawer from 'smiles-drawer';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit, AfterViewInit {

  @ViewChildren('cmp') components: QueryList<ElementRef>;
  dataTable: any;

  constructor(public prediction: Prediction) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.components !== undefined) {
      this.components.forEach((child) => {
        const options = {'width': 300, 'height': 150};
        const smilesDrawer = new SmilesDrawer.Drawer(options);
        SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
          smilesDrawer.draw(tree, child.nativeElement.id, 'light', false);
          }, function (err) {
            console.log(err);
          });
      });
    }
    const table: any = $('#info');
    this.dataTable = table.DataTable();
  }
}
