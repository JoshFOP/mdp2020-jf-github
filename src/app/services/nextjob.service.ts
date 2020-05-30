import { Injectable } from '@angular/core';

@Injectable()
export class NextjobService {
  nextJob = null;
  constructor() {
    if (localStorage.nextJob == null) {
        localStorage.setItem('nextJob', JSON.stringify(this.nextJob));
    }

}

  getNextJob() {
    let nextJob = JSON.parse(localStorage.getItem('nextJob'));
    return nextJob;
  }

  // Overwrites the nextJob value in local storage each time.
  addNextJob(NextJob): void {
    localStorage.setItem('nextJob', JSON.stringify(NextJob));
  }
}
  