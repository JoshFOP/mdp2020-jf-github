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
    private router: Router) { 
      this.newToDoItem = '';
      this.toDoItems = [];
    }

  // Make my 'peopleForm' a FormGroup
  jobsForm: FormGroup;

  //router
  id: number;
  private sub: any;
  //people array
  jobs: any;
  clients: any;
  //To Do List
  savedToDo: any;
  newToDoItem: string;
  toDoItems: any;
  savedToDoItems: any;
  editValue: boolean = false;
  toDoListEdit: any;

  addTodo(event, id) {
      if(this.jobs[this.id].ToDoList == null) {
        this.toDoItems.push(this.newToDoItem);
        console.log(this.jobs[this.id].ToDoList);
        this.newToDoItem = '';
        this.savedToDoItems = this.toDoItems;
        this.toDoItems = '';
        this.jobsForm.setValue({        
          clientJob: this.jobs[this.id].clientJob,
          JobTitle: this.jobs[this.id].JobTitle,
          quote: this.jobs[this.id].quote,
          startDate: this.jobs[this.id].startDate,
          finishDate: this.jobs[this.id].finishDate,
          JobStatus: this.jobs[this.id].JobStatus,
          ToDoList: this.savedToDoItems,
          JobLog: this.jobs[this.id].JobLog,
          ExpensesLog: this.jobs[this.id].ExpensesLog,
          });
        console.log(this.savedToDoItems);
        this.SubmitToDoList();
      }
      else {
        let tdlJobsArray = this.jobs[this.id].ToDoList;
        this.savedToDoItems = tdlJobsArray.concat(this.newToDoItem);
        console.log(this.jobs[this.id].ToDoList);
        this.newToDoItem = '';
        this.jobsForm.setValue({        
          clientJob: this.jobs[this.id].clientJob,
          JobTitle: this.jobs[this.id].JobTitle,
          quote: this.jobs[this.id].quote,
          startDate: this.jobs[this.id].startDate,
          finishDate: this.jobs[this.id].finishDate,
          JobStatus: this.jobs[this.id].JobStatus,
          ToDoList: this.savedToDoItems,
          JobLog: this.jobs[this.id].JobLog,
          ExpensesLog: this.jobs[this.id].ExpensesLog,
        });
        this.SubmitToDoList();
      }
    }

    deleteToDoList(index) {
      let savedToDoList = this.jobs[this.id].ToDoList;
      savedToDoList.splice(index, 1);
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: savedToDoList,
        JobLog: this.jobs[this.id].JobLog,
        ExpensesLog: this.jobs[this.id].ExpensesLog,
        });
        this.SubmitToDoList();
    }
  
    editToDoList(index) {
      this.editValue = true;
      let savedToDoList = this.jobs[this.id].ToDoList;
      this.toDoListEdit = savedToDoList[index];
      
    }

    submitEditToDoList(){
      this.toDoListEdit
      let savedToDoList 
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: savedToDoList ,
        JobLog: this.jobs[this.id].JobLog,
        ExpensesLog: this.jobs[this.id].ExpensesLog,
        });
        this.SubmitToDoList();
    }

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
      this.initialiseForm(this.jobs, this.id); // Creates a form 
    } // end ngOnInit
    
    SubmitToDoList() {
    // Grap the edited values from the Form
    const jobsform = this.jobsForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
    this.js.addToDoList(jobsform, this.id);
    this.jobs = this.js.getJob();
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




