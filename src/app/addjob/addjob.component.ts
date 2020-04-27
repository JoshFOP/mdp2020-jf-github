import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private js: JobsService,
    private cs: ClientsService,
    private router: Router)
   { }

  // People Variable to hold all people
  clients: any;
  jobs: any;
  jobsForm: FormGroup;

  ngOnInit(): void {
    // Call PeopleService Method "getPeople" and assign all data to 'people'
    this.clients = this.cs.getClient() 
    this.jobs = this.js.getJob() 

    this.jobsForm = this.fb.group(
      {
        clientJob: [null],
        JobTitle: [null],
        quote: [null],
        JobStatus: [null],
        ToDoList: [null],
        JobLog: [null],
        ExpensesLog: [null],
        
      }
    );
  }

  submit(): void {   
    this.js.addJob(this.jobsForm.value);
    alert("Data added to database" ) ;
    this.jobsForm.reset();
    this.router.navigate(['/home'])
    }
  }



