import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';
import { NextjobService } from '../services/nextjob.service';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private fb: FormBuilder,
    private js: JobsService,
    private cs: ClientsService,
    private njs: NextjobService,
    private router: Router,) { }

  clients: any;
  jobs: any;
  nextJob: any;
  nextJobForm: FormGroup;


  ngOnInit() {
    this.clients = this.cs.getClient(); 
    this.jobs = this.js.getJob();
    this.nextJob = this.njs.getNextJob();

      this.nextJobForm = this.fb.group(
      {
        jobIndex: [null],
        jobDate: [null],
        
      }
    );
  }

  submit(): void {   
    this.njs.addNextJob(this.nextJobForm.value);
    alert("Data added to database" );
    this.nextJobForm.reset();
    this.router.navigate(['/home'])
    }
  } 

