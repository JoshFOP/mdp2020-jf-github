import { Injectable } from '@angular/core';

@Injectable()
export class NextjobService {
  nextJob = null;
  constructor() {
      /* ====LOCALSTORAGE========
    Local storage stores data as key-value pairs, and the values are stored as "strings". 
    So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object. when we retrieve it.
    */
    if (localStorage.nextJob == null) {
        localStorage.setItem('nextJob', JSON.stringify(this.nextJob));
    }

}

  getNextJob() {
    let nextJob = JSON.parse(localStorage.getItem('nextJob'));
    return nextJob;
  }

  // this FUNCTION accepts 'one' parameter 'person'
  // and pushes this parameter into the peole array
  addNextJob(NextJob): void {
    localStorage.setItem('nextJob', JSON.stringify(NextJob));
  }
}
  