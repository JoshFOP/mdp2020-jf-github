import { Component, OnInit } from '@angular/core';

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
    }
    else {
      alert("Cancelled")
    }
    
  }

  constructor() { }

  ngOnInit() {
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




