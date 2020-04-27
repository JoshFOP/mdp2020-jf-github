import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {NgModule} from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-closedjobs',
  templateUrl: './closedjobs.component.html',
  styleUrls: ['./closedjobs.component.css']
})
export class ClosedjobsComponent implements OnInit {

  constructor(private js: JobsService,private cs: ClientsService) {
  } 

  // People Variable to hold all people
  jobs: any;
  clients:any;
  found: any;

  ngOnInit(): void {
    // Call PeopleService Method "getPeople" and assign all data to 'people'
    this.jobs = this.js.getJob()
    this.clients=this.cs.getClient()
    
  } //end ngOnInit()

  openJobPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id    
   
    }  //end dialogConfig
}
  