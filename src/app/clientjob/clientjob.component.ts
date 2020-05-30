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

// Expenses table 
  displayedColumns: string[] = ['ItemQty', 'ItemExp', 'ItemPrice', 'TotalCost', 'Edit'];

// Close job function. Shows a pop up when the user clicks close job.
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
// Reopen job function. Reopens job and shows confirmation.
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

  DeleteJob() {
    var deletejobcon = confirm("Are you sure you want to delete this job?");
    if (deletejobcon == true) {
      alert("Job has been deleted");
      this.js.deleteJob(this.id);
      this.router.navigate(['/home']);
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
      // To Do List constructors 
      this.toDoItems = [];
      this.toDoItem = '';
      // Job Log Constructors
      this.jobLogItems = [];
      this.jobLogDate = '';
      this.jobLogHours = '';
      this.jobLogItem = '';
      // Expenses Constructors
      this.expenseItems = [];
      this.expenseQty = ''; 
      this.expensePrice = ''; 
      this.expenseItem = '';
    }

  // Initiates jobs form
  jobsForm: FormGroup;
  id: number;
  private sub: any;
  //Databases
  jobs: any;
  clients: any;
  //To Do List variables
  toDoItems: any; // This is the to do list array 
  savedToDoItems: any;
  editToDoValue: boolean = false;
  toDoListEdit: any;
  toDoIndex: any;
  toDoListObj: any;
  toDoItem: any; // Holds individual to do list item.
  toDoStatus: boolean = false;
  //To Do List end


  // START To Do List function
  addTodo(event, id) {
    this.toDoListObj = {
        toDoItem: this.toDoItem,
        toDoStatus: this.toDoStatus,
      };
    if(this.jobs[this.id].ToDoList == null) {
      this.toDoItems.push(this.toDoListObj);
      console.log(this.jobs[this.id].ToDoList);
      this.toDoListObj = '';
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
        this.toDoItem = '';
        this.SubmitJobsData();
      }
      else {
        let tdlJobsArray = this.jobs[this.id].ToDoList;
        this.savedToDoItems = tdlJobsArray.concat(this.toDoListObj);
        console.log(this.jobs[this.id].ToDoList);
        this.toDoListObj = '';
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
        this.toDoItem = '';
        this.SubmitJobsData();
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
        this.SubmitJobsData();
    }
      // This function gets the item to be editted and passes its index and edit status to the submit edit to do list
    editToDoList(index) {
      let savedToDoList = this.jobs[this.id].ToDoList;
      this.toDoListEdit = savedToDoList[index];
      this.editToDoValue = true;
      this.toDoIndex = index;
    }

    submitEditToDoList(){
      let savedToDoList = this.jobs[this.id].ToDoList;
      savedToDoList.splice(this.toDoIndex, 1);
      let editedToDoItem = savedToDoList.concat(this.toDoListEdit);
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: editedToDoItem,
        JobLog: this.jobs[this.id].JobLog,
        ExpensesLog: this.jobs[this.id].ExpensesLog,
        });
        this.editToDoValue = false;
        this.SubmitJobsData();
    }
      // These two functions control to do list items that have been marked complete or are yet to be completed.
    checkedToDo(index) {
      this.js.markCompleteToDo(this.id, index);
      this.jobs = this.js.getJob();
    }

    uncheckedToDo(index) {
      this.js.markIncompleteToDo(this.id, index);
      this.jobs = this.js.getJob();
    }

  // END To Do List

  // START Job Log
  jobLogItems: any;
  jobLogObj: any;
  jobLogDate: any;
  jobLogHours: any;
  jobLogItem: string;
  savedJobLogItems: any;
  editJobLogValue: boolean = false;
  jobLogEdit: any;
  jobLogIndex: any;

  addJobLog(event, id) {
    this.jobLogObj = {
      jobLogDate: this.jobLogDate,
      jobLogHours: this.jobLogHours,
      jobLogItem: this.jobLogItem,
    };
    if(this.jobs[this.id].JobLog == null) {
      this.jobLogItems.push(this.jobLogObj);
      console.log(this.jobs[this.id].JobLog);
      this.jobLogObj = '';
      this.savedJobLogItems = this.jobLogItems;
      this.jobLogItems = '';
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: this.jobs[this.id].ToDoList,
        JobLog: this.savedJobLogItems,
        ExpensesLog: this.jobs[this.id].ExpensesLog,
      });
      console.log(this.savedJobLogItems);
      this.jobLogDate = '';
      this.jobLogHours = '';
      this.jobLogItem = '';
      this.SubmitJobsData();
    }
    else {
      let jobLogArray = this.jobs[this.id].JobLog;
      this.savedJobLogItems = jobLogArray.concat(this.jobLogObj);
      this.savedJobLogItems.sort(function(a, b) {
        var c = new Date(a.jobLogDate);
        var d = new Date(b.jobLogDate);
        return c-d;
      });
      console.log(this.jobs[this.id].JobLog);
      this.jobLogItems = '';
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: this.jobs[this.id].ToDoList,
        JobLog: this.savedJobLogItems,
        ExpensesLog: this.jobs[this.id].ExpensesLog,
      });
      this.jobLogDate = '';
      this.jobLogHours = '';
      this.jobLogItem = '';
      this.SubmitJobsData();
    }
  }

  deleteJobLog(index) {
    let savedJobLog = this.jobs[this.id].JobLog;
    savedJobLog.splice(index, 1);
    this.jobsForm.setValue({        
      clientJob: this.jobs[this.id].clientJob,
      JobTitle: this.jobs[this.id].JobTitle,
      quote: this.jobs[this.id].quote,
      startDate: this.jobs[this.id].startDate,
      finishDate: this.jobs[this.id].finishDate,
      JobStatus: this.jobs[this.id].JobStatus,
      ToDoList: this.jobs[this.id].ToDoList,
      JobLog: savedJobLog,
      ExpensesLog: this.jobs[this.id].ExpensesLog,
    });
    this.SubmitJobsData();
  }
  
  editJobLog(index) {
    let savedJobLog = this.jobs[this.id].JobLog;
    this.jobLogEdit = savedJobLog[index];
    this.editJobLogValue = true;
    this.jobLogIndex = index;
  }

  submitEditJobLog(){
    let savedJobLog = this.jobs[this.id].JobLog;
    savedJobLog.splice(this.jobLogIndex, 1);
    let editedJobLog = savedJobLog.concat(this.jobLogEdit);
    editedJobLog.sort(function(a, b) {
      var c = new Date(a.jobLogDate);
      var d = new Date(b.jobLogDate);
      return c-d;
    });
    this.jobsForm.setValue({        
      clientJob: this.jobs[this.id].clientJob,
      JobTitle: this.jobs[this.id].JobTitle,
      quote: this.jobs[this.id].quote,
      startDate: this.jobs[this.id].startDate,
      finishDate: this.jobs[this.id].finishDate,
      JobStatus: this.jobs[this.id].JobStatus,
      ToDoList: this.jobs[this.id].ToDoList,
      JobLog: editedJobLog,
      ExpensesLog: this.jobs[this.id].ExpensesLog,
    });
    this.editJobLogValue = false;
    this.SubmitJobsData();
  }

      // Calculates total hours the user has worked on a job.
  getTotalHours() {
    if(this.jobs[this.id].JobLog !== null) {
    return this.jobs[this.id].JobLog.map(jL => jL.jobLogHours).reduce((totalHr, value) => totalHr + value, 0);
    }
  }
  // END Job Log

  // START Expenses
  expenseItems: any;
  expenseObj: any;
  expenseQty: any;
  expensePrice: any;
  expenseItem: string;
  savedExpensesItems: any;
  editExpensesValue: boolean = false;
  expenseEdit: any;
  expensesIndex: any;
  totalItemCost: any;

  addExpense(event, id) {
    this.expenseObj = {
      expenseQty: this.expenseQty,
      expensePrice: this.expensePrice,
      expenseItem: this.expenseItem,
    };
    if(this.jobs[this.id].ExpensesLog == null) {
      this.expenseItems.push(this.expenseObj);
      console.log(this.jobs[this.id].ExpensesLog);
      this.expenseObj = '';
      this.savedExpensesItems = this.expenseItems;
      this.expenseItems = '';
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: this.jobs[this.id].ToDoList,
        JobLog: this.jobs[this.id].JobLog,
        ExpensesLog: this.savedExpensesItems,
      });
      console.log(this.savedExpensesItems);
      this.expenseQty = '';
      this.expensePrice = '';
      this.expenseItem = '';
      this.SubmitJobsData();
    }
    else {
      let expensesArray = this.jobs[this.id].ExpensesLog;
      this.savedExpensesItems = expensesArray.concat(this.expenseObj);
      console.log(this.jobs[this.id].ExpensesLog);
      this.expenseItems = '';
      this.jobsForm.setValue({        
        clientJob: this.jobs[this.id].clientJob,
        JobTitle: this.jobs[this.id].JobTitle,
        quote: this.jobs[this.id].quote,
        startDate: this.jobs[this.id].startDate,
        finishDate: this.jobs[this.id].finishDate,
        JobStatus: this.jobs[this.id].JobStatus,
        ToDoList: this.jobs[this.id].ToDoList,
        JobLog: this.jobs[this.id].JobLog,
        ExpensesLog: this.savedExpensesItems,
      });
      this.expenseQty = '';
      this.expensePrice = '';
      this.expenseItem = '';
      this.SubmitJobsData();
    }
  }

  deleteExpense(index) {
    let savedExpenses = this.jobs[this.id].ExpensesLog;
    savedExpenses.splice(index, 1);
    this.jobsForm.setValue({        
      clientJob: this.jobs[this.id].clientJob,
      JobTitle: this.jobs[this.id].JobTitle,
      quote: this.jobs[this.id].quote,
      startDate: this.jobs[this.id].startDate,
      finishDate: this.jobs[this.id].finishDate,
      JobStatus: this.jobs[this.id].JobStatus,
      ToDoList: this.jobs[this.id].ToDoList,
      JobLog: this.jobs[this.id].JobLog,
      ExpensesLog: savedExpenses,
    });
    this.SubmitJobsData();
  }
  
  editExpense(index) {
    let savedExpenses = this.jobs[this.id].ExpensesLog;
    this.expenseEdit = savedExpenses[index];
    this.editExpensesValue = true;
    this.expensesIndex = index;
  }

  submitEditExpense(){
    let savedExpenses = this.jobs[this.id].ExpensesLog;
    savedExpenses.splice(this.expensesIndex, 1);
    let editedExpenses = savedExpenses.concat(this.expenseEdit);
    this.jobsForm.setValue({        
      clientJob: this.jobs[this.id].clientJob,
      JobTitle: this.jobs[this.id].JobTitle,
      quote: this.jobs[this.id].quote,
      startDate: this.jobs[this.id].startDate,
      finishDate: this.jobs[this.id].finishDate,
      JobStatus: this.jobs[this.id].JobStatus,
      ToDoList: this.jobs[this.id].ToDoList,
      JobLog: this.jobs[this.id].JobLog,
      ExpensesLog: editedExpenses,
    });
    this.editExpensesValue = false;
    this.SubmitJobsData();
  }

    // This function gets the price of each individual item and adds them all together to get a total price
  getTotalExpense() {
    this.totalItemCost = 0;
    let jobs = this.jobs[this.id].ExpensesLog;
    if(jobs !== null) {
      var i;
      var totalPrice = 0;
      for(i = 0; i < jobs.length; i++) {
        totalPrice = jobs[i].expenseQty * jobs[i].expensePrice;
        this.totalItemCost += totalPrice;
      }
      return this.totalItemCost;
    }
  }
  


  ngOnInit() {
    // Calls the jobs and clients databases.
    this.jobs = this.js.getJob();
    this.clients = this.cs.getClient();
    console.log(this.jobs);

    // This code gets the id of the job.
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; 
    });
    this.initialiseForm(this.jobs, this.id); // initilises form for jobs
    }
    
  SubmitJobsData() {
    const jobsform = this.jobsForm.value;
    this.js.editJob(jobsform, this.id);
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








