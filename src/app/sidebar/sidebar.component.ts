import { Component, OnInit } from '@angular/core';
import { Model } from '../Model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model : Model ) { }

  ngOnInit() {
  }

}
