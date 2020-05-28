import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.css']
})
export class EditjobComponent implements OnInit {

constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cs: ClientsService,
    private js: JobsService,
    private router: Router) { }

  jobsForm: FormGroup;
  id: number;
  private sub: any;
  jobs: any;
  clients: any;

  ngOnInit() {
    // Gets jobs and client database
    this.jobs = this.js.getJob();
    this.clients = this.cs.getClient();

    // Gets the id of the job.
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.initialiseForm(this.jobs, this.id);
  }

  errorMessage: any;
  valid: any;
  // Validates the edited data
  submitEdit(): void {  
    this.errorMessage = "";
    this.valid = this.js.checkAdd(this.jobsForm.value);
    if (this.valid == "pass") {
      this.js.editJob(this.jobsForm.value, this.id);
      alert("Data added to database" ) ;
      this.jobsForm.reset();
      this.router.navigate(['/clientjob', this.id]);

    }
    if (this.valid == "clientJobFail") {
      this.errorMessage = "* You must select a client";
    }

    else if (this.valid == "JobTitleFail") {
      this.errorMessage = "* You must enter a job title";
    }

    else if (this.valid == "quoteFail") {
      this.errorMessage = "* You must enter a quote amount";
    }

    else if (this.valid == "startDateFail") {
      this.errorMessage = "* You must enter a start date";
    }

     else if (this.valid == "finishDateFail") {
      this.errorMessage = "* You must enter a finish date";
    }

  }
  initialiseForm(jobs, id): void {
    this.jobsForm = this.fb.group(
      {
        clientJob: [this.jobs[id].clientJob],
        JobTitle: [this.jobs[id].JobTitle],
        quote: [this.jobs[id].quote],
        startDate: [this.jobs[id].startDate],
        finishDate: [this.jobs[id].finishDate],
        JobStatus: [this.jobs[id].JobStatus],
        ToDoList: [this.jobs[id].ToDoList],
        JobLog: [this.jobs[id].JobLog],
        ExpensesLog: [this.jobs[id].ExpensesLog],
      }
    );
  } 
}