import { Component, OnInit } from '@angular/core';

export interface Job {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editnextjob',
  templateUrl: './editnextjob.component.html',
  styleUrls: ['./editnextjob.component.css']
})
export class EditnextjobComponent implements OnInit {

  jobs: Job[] = [
      {value: 'JohnAppleseed-0', viewValue: 'John Appleseed'},
      {value: 'BobSmith-1', viewValue: 'Bob Smith'},

    ];

  constructor() { }

  ngOnInit() {
  }

}
