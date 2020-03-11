import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

export interface Client {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})

export class AddjobComponent implements OnInit {

  clients: Client[] = [
      {value: 'JohnAppleseed-0', viewValue: 'John Appleseed'},
      {value: 'BobSmith-1', viewValue: 'Bob Smith'},

    ];

  constructor() { }

  ngOnInit() {
  }

}

