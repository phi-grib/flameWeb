import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Prediction } from '../Globals';
import * as SmilesDrawer from 'smiles-drawer';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']/*,
  encapsulation: ViewEncapsulation.ShadowDom*/
})
export class PredictionComponent implements OnInit, AfterViewInit {

  @ViewChildren('cmp') components: QueryList<ElementRef>;
  dataTable: any;
  info = [];
  constructor(public prediction: Prediction) { }

  ngOnInit() {
  }

  saveEXCEL() {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.info);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.prediction.name + 'v.' + this.prediction.version + '_' +this.prediction.file_info['name'] + '.xlsx');
  }
  savePDF() {

    const pdf = new jsPDF();
    pdf.autoTable({
      head: [['Name', 'Mol', 'Value', 'Prediction']],
      body: this.info,
      headStyles: {
        2: { halign: 'center'},
        3: { halign: 'center'},
      },
      columnStyles: {
        0: {columnWidth: 40},
        1: {columnWidth: 40},
        2: {columnWidth: 10, halign: 'center'},
        3: {columnWidth: 10, halign: 'center'},
      }
    });
    pdf.save(this.prediction.name + 'v.' + this.prediction.version + '_' +this.prediction.file_info['name'] + '.pdf');
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
    // pdf.autoTable({html: '#info'});
    this.info = [];
    for (let i = 0; i < this.prediction.result.SMILES.length;) {
      this.info.push([this.prediction.result.obj_nam[i], this.prediction.result.SMILES[i],
        this.prediction.result.ymatrix[i].toFixed(3), this.prediction.result.values[i].toFixed(3)]);
        i = i + 1;
    }
  }
}
