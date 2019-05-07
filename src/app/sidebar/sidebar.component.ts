import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Model, Globals } from '../Globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model,
    public globals: Globals,
    private router: Router ) {}


  ngOnInit() {
  }

  changeTab(tab: string) {
    this.globals.actualTab = tab;
    this.router.navigate(['/']);

  }

}
