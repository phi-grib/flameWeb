import { Component, OnInit } from '@angular/core';
import { Model } from '../Model';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public model: Model,
    private service: SidebarService,
    private router: Router,
    private toastr: ToastrService ) {}


  ngOnInit() {
  }



  private isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
  }

  private recursiveDelta(dict_in: {}) {

    let dict_aux = {};
    const dict_out = {}
    for (const key of Object.keys(dict_in)) {
      dict_aux = dict_in[key];
      for (const key2 of Object.keys(dict_aux)) {
        if (key2 === 'value' ){
          if (this.isDict(dict_aux[key2])) {
            dict_out[key] = this.recursiveDelta(dict_aux[key2]);
          }
          else {
            dict_out[key] = dict_aux[key2];
          }
        }
      }
    }
    return dict_out;
  }

  buildModel(name, version): void {

    this.model.delta = {};
    this.model.delta = this.recursiveDelta(this.model.parameters);
    this.model.trainig_models.push(name + '-' + version);
    const inserted = this.toastr.info('Running!', 'Model ' + this.model.name + '.v' + this.model.version , {
      disableTimeOut: true, positionClass: 'toast-top-right'});

    this.service.buildModel().subscribe(
      result => {
        const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
        if (index > -1) {
          this.model.trainig_models.splice(index, 1);
        }
        this.model.listModels[name + '-' + version].trained = true;
        this.toastr.clear(inserted.toastId);
        this.toastr.success('Created!', 'Model ' + this.model.name + '.v' + this.model.version , {
          timeOut: 5000, positionClass: 'toast-top-right'});
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['/']);
  }
}
