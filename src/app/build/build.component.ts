import { Component, OnInit } from '@angular/core';
import { BuildService } from './build.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor(private service: BuildService) { }

  ngOnInit() {

  }

}
