import { Component, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent {
  // ViewChild is a method that allows you
  // to get a html element from your html page
  @ViewChild('snav') snav: MatSidenav;

    close(){
      this.snav.close();
    }
}
