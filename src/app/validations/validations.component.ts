import { Component, OnInit } from '@angular/core';
import {Model} from '../Model';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent {
  constructor(public model: Model) { }

}
