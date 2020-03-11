import { Injectable } from '@angular/core';

@Injectable()
export class ClientsService {
clients=[];
  valid: any;
  constructor() {
    /* LOCALSTORAGE
      Saves clients object into local storage
    */
    if (localStorage.clients == null ) {
        localStorage.setItem('clients', JSON.stringify(this.clients));
    }

  } //end constructor


  getClient() {
    let clients = JSON.parse(localStorage.getItem('clients'));
    return clients;
  }

  // this FUNCTION accepts 'one' parameter 'person'
  // and pushes this parameter into the peole array
  addClient(Client): void {
    let clients = JSON.parse(localStorage.getItem('clients'));
    clients.push(Client);
    localStorage.setItem('clients', JSON.stringify(clients));
  }


  editClient(Client, id): void {
    let clients = JSON.parse(localStorage.getItem('clients'));
    clients[id] = Client;
    localStorage.setItem('clients', JSON.stringify(clients));
    
  }

  deleteClient(id): void {
    let clients = this.getClient()
    clients.splice(id, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
  }

    checkAdd(addValues): void {
    //check if inputs in the add are valid
    this.valid = "pass";
    if (typeof addValues.name === 'undefined' || addValues.name == null || addValues.name == "") {
      this.valid = "nameFail";
    }

    else if (typeof addValues.Pnum === 'undefined' || addValues.Pnum == null || addValues.Pnum == "") {
      this.valid = "PnumFail";
    }

    else if (typeof addValues.Email === 'undefined' || addValues.Email == null || addValues.Email == "") {
      this.valid = "EmailFail";
    }

    else if (typeof addValues.Add1 === 'undefined' || addValues.Add1 == null || addValues.Add1 == "") {
      this.valid = "Add1Fail";
    }

    else if (typeof addValues.city === 'undefined' || addValues.city == null || addValues.city == "") {
      this.valid = "CityFail";
    }

    else if (typeof addValues.state === 'undefined' || addValues.state == null || addValues.state == "") {
      this.valid = "StateFail";
    }

    else if (typeof addValues.Pcode === 'undefined' || addValues.Pcode == null || addValues.Pcode == "") {
      this.valid = "PcodeFail";
    }
    console.log("fName is " + addValues.fName); //debugging output
    console.log("valid is inside check " + this.valid); //debugging output

    return this.valid;

    }
}  // end class