import { Injectable } from '@angular/core';

@Injectable()
export class JobsService {
jobs=[];
  valid: any;
  constructor() {
      /* ====LOCALSTORAGE========
    Local storage stores data as key-value pairs, and the values are stored as "strings". 
    So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object. when we retrieve it.
    */
    if (localStorage.jobs == null) {
        localStorage.setItem('jobs', JSON.stringify(this.jobs));
    }

  } //end constructor


  getJob() {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    return jobs;
  }

  // this FUNCTION accepts 'one' parameter 'person'
  // and pushes this parameter into the peole array
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
    let jobs = this.getJob()
    jobs[id].JobStatus = false;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  reopenJob(id): void {
    let jobs = this.getJob()
    jobs[id].JobStatus = true;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
//probs dont need this
  addToDoList(Job, id): void {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs[id] = Job;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  checkAdd(addValues): void {
    //check if inputs in the add are valid
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
}  // end class
    

