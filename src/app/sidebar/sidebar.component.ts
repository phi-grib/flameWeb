import { Component, OnInit } from '@angular/core';
import { Model } from '../Model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model, private service: SidebarService ) { }

  ngOnInit() {
  }

  buildModel(): void {

    console.log(this.model.parameters);
    console.log(this.model.file);
    

    this.service.buildModel().subscribe(
      result => {
        console.log(result);
        alert('OK');
      },
      error => {
        console.log(error);
        alert('error');
      }
    );
  }
}
