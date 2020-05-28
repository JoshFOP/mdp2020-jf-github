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

  constructor(private js: JobsService,private cs: ClientsService, private njs: NextjobService) {
  } 

  jobs: any;
  clients:any;
  found: any;
  nextJob: any;

  ngOnInit(): void {
    // Calls the jobs, client and next job database
    this.jobs = this.js.getJob()
    this.clients=this.cs.getClient()
    this.nextJob = this.njs.getNextJob();
    
  } 

}
  

