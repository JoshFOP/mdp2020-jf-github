import { Injectable } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Injectable()
export class ClientsService {
clients=[];
  valid: any;
  constructor(private js: JobsService) {
    // initial save. Sets the array for the first client entered
    if (localStorage.clients == null ) {
        localStorage.setItem('clients', JSON.stringify(this.clients));
        localStorage.setItem('maxclientid', "0"); // Sets permanent ID for client to prevent jobs and clients being mismatched
    }
  }

  // Gets the client when called by another component.
  getClient() {
    let clients = JSON.parse(localStorage.getItem('clients'));
    return clients;
  }

  // If one or more client has been entered, this function is called to push another client to the database.
  addClient(Client): void {
    let id = Number(localStorage.getItem('maxclientid')) + 1;
    localStorage.setItem('maxclientid', id.toString());
    Client.id = id;
    let clients = JSON.parse(localStorage.getItem('clients'));
    clients.push(Client);
    clients.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  editClient(Client, id): void {
    let clients = JSON.parse(localStorage.getItem('clients'));
    clients[id] = Client;
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  // This function gets a client by their permanent ID
  getClientById(id): void {
    let clients = this.getClient();
    var found = null;
    for (var i=0; i<clients.length; i++) {
      if (clients[i].id == id && found == null) {
        found = clients[i];
      }
    }
    return found;
    console.log(found);
  }

  deleteClient(id): void {
    let clients = this.getClient();
    clients.splice(id, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  // Checks to see if a clients name already exists.
  checkCurrentClients(newName) {
    let clients = this.getClient();
    let name;
    for(let i=0; i < clients.length; i++) {
      let clientname = clients[i].name
      if(clientname == newName.name) {
        return clientname;
      }
    }
  }

  checkAdd(addValues): void {
    //check if inputs in the add are valid
    this.valid = "pass";
    if (typeof addValues.name === 'undefined' || addValues.name == null || addValues.name == "") {
      this.valid = "nameFail";
    }
    else if (addValues.name == this.checkCurrentClients(addValues)) {
      this.valid = "sameNameFail";
    }

    else if (typeof addValues.Pnum === 'undefined' || addValues.Pnum == null || addValues.Pnum == "") {
      this.valid = "PnumFail";
    }

    else if (addValues.Pnum.toString().length != 10) {
      this.valid = "PnumFailInvalid";
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
    console.log("name is " + addValues.name); //debugging output
    console.log("valid is inside check " + this.valid); //debugging output

    return this.valid;

    }
    
  // checks edited values.
  checkEdit(addValues): void {
    //check if inputs in the add are valid
    this.valid = "pass";
    if (typeof addValues.name === 'undefined' || addValues.name == null || addValues.name == "") {
      this.valid = "nameFail";
    }

    else if (typeof addValues.Pnum === 'undefined' || addValues.Pnum == null || addValues.Pnum == "") {
      this.valid = "PnumFail";
    }

    else if (addValues.Pnum.toString().length != 10) {
      this.valid = "PnumFailInvalid";
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
    console.log("name is " + addValues.name); //debugging output
    console.log("valid is inside check " + this.valid); //debugging output

    return this.valid;

    }
}