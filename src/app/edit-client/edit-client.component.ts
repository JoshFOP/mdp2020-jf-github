import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {



constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cs: ClientsService,
    private router: Router) { }

  clientsForm: FormGroup;
  id: number;
  private sub: any;
  clients: any;

  ngOnInit() {
    // Gets clients database
    this.clients = this.cs.getClient();
    // Gets the clients id
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.initialiseForm(this.clients, this.id); // Creates a form Group
  } 

  valid: any;
  errorMessage: any;
  
  // Submits edit and reroutes to the clients page.
  submitEdit(): void {  
    this.errorMessage = "";
    this.valid = this.cs.checkAdd(this.clientsForm.value); // Gets the parameters for what is considered to be valid from the clients.service.ts
    if (this.valid == "pass") {
      this.cs.editClient(this.clientsForm.value, this.id);
      alert("Data added to database");
      this.clientsForm.reset();
      this.router.navigate(["/clientinfo", this.id]);
    }

    if (this.valid == "nameFail") {
      this.errorMessage = "* You must enter a name";
    }

    else if (this.valid == "PnumFail") {
      this.errorMessage = "* You must enter a phone number";
    }

    else if (this.valid == "PnumFailInvalid") {
      this.errorMessage = "* You must enter a valid phone number";
    }

    else if (this.valid == "Add1Fail") {
      this.errorMessage = "* Address Line 1 entry has an error";
    }

    else if (this.valid == "CityFail") {
      this.errorMessage = "* City entry has an error";
    }

    else if (this.valid == "StateFail") {
      this.errorMessage = "* State entry has an error";
    }

    else if (this.valid == "PcodeFail") {
      this.errorMessage = "* Postal Code entry has an error";
    }    
  }
  
  initialiseForm(clients, id): void {
    this.clientsForm = this.fb.group(
      {
        name: [this.clients[id].name],
        Pnum: [this.clients[id].Pnum],
        Email: [this.clients[id].Email],
        Add1: [this.clients[id].Add1],
        Add2: [this.clients[id].Add2],
        city: [this.clients[id].city],
        state: [this.clients[id].state],
        Pcode: [this.clients[id].Pcode],
        id: [this.clients[id].id]
      }
    );
  } 
}
