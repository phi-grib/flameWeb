import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Model, Globlas } from '../Global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model,
    public globals: Globlas,
    private router: Router ) {}


  ngOnInit() {
  }

  changeTab(tab: string) {
    this.globals.actualTab = tab;
    this.router.navigate(['/']);

  }

}
