import { Component, OnInit } from '@angular/core';
import { Model } from '../Model';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-predicter',
  templateUrl: './predicter.component.html',
  styleUrls: ['./predicter.component.css']
})
export class PredicterComponent implements OnInit {

  constructor(public model: Model,
    private commonService: CommonService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }
}
