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


  //Removed the edit function

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

  addToDoList(Job, id): void {
    let jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs[id] = Job;
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

    

    
}  // end class