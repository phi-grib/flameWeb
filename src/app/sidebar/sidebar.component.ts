import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Model, Globlas } from '../Global';
import { SidebarService } from './sidebar.service';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model,
    public globals: Globlas ) {}


  ngOnInit() {
  }

  changeTab(tab: string) {
    this.globals.actualTab = tab;

  }

}
