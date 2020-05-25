import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {NgModule} from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';
import { NextjobService } from '../services/nextjob.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  todaysJobData = 'John Appleseed';


  

  constructor(private js: JobsService,private cs: ClientsService, private njs: NextjobService) {
  } 

  // People Variable to hold all people
  jobs: any;
  clients:any;
  found: any;
  nextJob: any;

  ngOnInit(): void {
    // Call PeopleService Method "getPeople" and assign all data to 'people'
    this.jobs = this.js.getJob()
    this.clients=this.cs.getClient()
    this.nextJob = this.njs.getNextJob();
    
  } //end ngOnInit()

  openJobPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id    
   
    }  //end dialogConfig
}
  

