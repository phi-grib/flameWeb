import { Component } from '@angular/core';
import {PlatformLocation  } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flameweb';

  constructor(private platformLocation: PlatformLocation) {
    const imageSource = this.platformLocation.pathname + 'assets/images/etransafe_logo@2x.png';
    }
}


