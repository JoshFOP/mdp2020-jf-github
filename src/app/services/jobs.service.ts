import { Injectable } from '@angular/core';

@Injectable()
export class JobsService {
jobs=[];
  valid: any;
  constructor() {
      // initial save of jobs data.
    if (localStorage.jobs == null) {
        localStorage.setItem('jobs', JSON.stringify(this.jobs));
    }

  } 


  getJob() {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    return jobs;
  }

  // If one or more jobs exist, they will be pushed to the array here.
  addJob(Job): void {
    Job.JobStatus = true;
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs.push(Job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  editJob(Job, id): void {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs[id] = Job;
    localStorage.setItem('jobs', JSON.stringify(jobs));
    
  }

  closeJob(id): void {
    let jobs = this.getJob();
    jobs[id].JobStatus = false;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  deleteJob(id): void {
    let jobs = this.getJob();
    jobs.splice(id, 1);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  reopenJob(id): void {
    let jobs = this.getJob()
    jobs[id].JobStatus = true;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  // Sets the to do list item status to true
  markCompleteToDo(id, index): void {
    let jobs = this.getJob()
    jobs[id].ToDoList[index].toDoStatus = true;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  // Sets the to do list item status to false
  markIncompleteToDo(id, index): void {
    let jobs = this.getJob()
    jobs[id].ToDoList[index].toDoStatus = false;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  // validates the values are valid when adding a job.
  checkAdd(addValues): void {
    this.valid = "pass";
    if (typeof addValues.clientJob === 'undefined' || addValues.clientJob == null || addValues.clientJob == "") {
      this.valid = "clientJobFail";
    }

    else if (typeof addValues.JobTitle === 'undefined' || addValues.JobTitle == null || addValues.JobTitle == "") {
      this.valid = "JobTitleFail";
    }

    else if (typeof addValues.quote === 'undefined' || addValues.quote == null || addValues.quote == "") {
      this.valid = "quoteFail";
    }

    else if (typeof addValues.startDate === 'undefined' || addValues.startDate == null || addValues.startDate == "") {
      this.valid = "startDateFail";
    }

    else if (typeof addValues.finishDate === 'undefined' || addValues.finishDate == null || addValues.finishDate == "") {
      this.valid = "finishDateFail";
    }

    return this.valid;

    }
} 
    

