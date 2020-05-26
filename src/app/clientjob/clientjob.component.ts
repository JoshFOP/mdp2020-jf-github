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

// Expenses START
  displayedColumns: string[] = ['ItemQty', 'ItemExp', 'ItemPrice', 'TotalCost', 'Edit'];
  
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

      this.jobLogItems = [];
      this.jobLogDate = '';
      this.jobLogHours = '';
      this.jobLogItem = '';

      this.expenseItems = [];
      this.expenseQty = ''; 
      this.expensePrice = ''; 
      this.expenseItem = '';
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
  newToDoItem: string;
  toDoItems: any;
  savedToDoItems: any;
  editToDoValue: boolean = false;
  toDoListEdit: any;
  toDoIndex: any;
  //To Do List end


  //ToDoList Start
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
        this.SubmitJobsData();
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
  
    editToDoList(index) {
      let savedToDoList = this.jobs[this.id].ToDoList;
      this.toDoListEdit = savedToDoList[index];
      this.editToDoValue = true;
      this.toDoIndex = index;
    }

    submitEditToDoList(){
      let savedToDoList = this.jobs[this.id].ToDoList;
      savedToDoList.splice(this.toDoIndex, 1);
      let editedToDoItem = savedToDoList.concat(this.toDoListEdit)
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

    //ToDoList End

  //Job Log Start
  jobLogItems: any;
  jobLogObj: any;
  jobLogDate: any;
  jobLogHours: any;
  jobLogItem: string;
  savedJobLogItems: any;
  editJobLogValue: boolean = false;
  jobLogEdit: any;
  jobLogIndex: any;
  //Job Log End

    //JobLog Start
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

    getTotalHours() {
      if(this.jobs[this.id].JobLog !== null) {
      return this.jobs[this.id].JobLog.map(jL => jL.jobLogHours).reduce((totalHr, value) => totalHr + value, 0);
    }
  }
    //JobLog End

      //Expenses Start
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
  //Expenses End

    //Expenses Start
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
    
    SubmitJobsData() {
    // Grap the edited values from the Form
    const jobsform = this.jobsForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
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








