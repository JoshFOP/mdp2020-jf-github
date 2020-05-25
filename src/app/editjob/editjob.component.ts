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

  // Make my 'peopleForm' a FormGroup
  jobsForm: FormGroup;

  //router
  id: number;
  private sub: any;
  jobs: any;
  clients: any;

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.jobs = this.js.getJob();
    this.clients = this.cs.getClient();

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });
    // FUNCTION INITIALISE FORM - see below
    // Pass it two paramters 1. people data array and 2. Current ID of the person
    // clicked on in the List
    this.initialiseForm(this.jobs, this.id); // Creates a form Group
  } // end ngOnInit

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';

  submitEdit() {
    // Grap the edited values from the Form
    const form = this.jobsForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
    this.js.editJob(form, this.id);
    this.jobs = this.js.getJob();
    alert("Client has been updated");
    this.router.navigate(['/home']);
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

  } // end initialiseForm

    openJobEditPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id;    
   
    }  //end dialogConfig
}