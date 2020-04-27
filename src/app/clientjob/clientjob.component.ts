import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { JobsService } from '../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clientjob',
  templateUrl: './clientjob.component.html',
  styleUrls: ['./clientjob.component.css']
})
export class ClientjobComponent implements OnInit {
// To Do List START
  JobsForClient: string[] = [
    'Install Tiles', 
    'Install Bench', 
    'Remove Cabinet', 
// To Do List END

    ];
// Job Log START
  DateLog: string[] = [
    '20/11/19',
    '27/11/19',
    '03/12/19'
  ];

  JobLog: string[] = [
    'Install Tiles', 
    'Install Bench', 
    'Remove Cabinet', 
  
    ];

  HoursLog: string[] = [
    '3', 
    '2', 
    '4', 
  
    ];
// Job Log END

// Expenses START
  displayedColumns: string[] = ['ItemQty', 'ItemExp', 'ItemPrice', 'TotalCost', 'Edit'];
  dataSource = EXPENSES_DATA;
// Expenses END

  CloseJob() {
    var closejobcon = confirm("Are you sure you want to close this job?");
    if (closejobcon == true) {
      alert("Job has been closed");
      this.js.closeJob(this.id);
      this.router.navigate(['/home']);
    }
    else {
      alert("Cancelled")
    }
    
  }

  ReopenJob() {
    var closejobcon = confirm("Are you sure you want to reopen this job?");
    if (closejobcon == true) {
      alert("Job has been reopened");
      this.js.reopenJob(this.id);
      this.router.navigate(['/home'])
    }
    else {
      alert("Cancelled")
    }
    
  }

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
  //people array
  jobs: any;
  clients: any;
  

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.jobs = this.js.getJob();
    this.clients = this.cs.getClient();
    console.log(this.jobs);

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });

    } // end ngOnInit


    openJobPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id;    
   
    }  //end dialogConfig
    
    deleteClient(id) {
      if (confirm("Are you sure you want to delete this client?")) {
        console.log("in delete :" + id)
        this.cs.deleteClient(this.id);
      }
      
    }
}


export interface ExpensesTable {
  ItemQty: number;
  ItemExp: string;
  ItemPrice: number;
  
  
}


const EXPENSES_DATA: ExpensesTable[] = [
  
  {ItemQty: 1, ItemExp: 'Wooden Planks', ItemPrice: 5, },
  {ItemQty: 2, ItemExp: 'Pack of Nails', ItemPrice: 2, },
  {ItemQty: 1, ItemExp: 'Paint', ItemPrice: 15, },
  
];




