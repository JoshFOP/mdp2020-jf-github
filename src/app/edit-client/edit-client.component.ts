import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {



constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cs: ClientsService) { }

  // Make my 'peopleForm' a FormGroup
  clientsForm: FormGroup;

  //router
  id: number;
  private sub: any;
  //people array
  clients: any

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.clients = this.cs.getClient();

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });
    // FUNCTION INITIALISE FORM - see below
    // Pass it two paramters 1. people data array and 2. Current ID of the person
    // clicked on in the List
    this.initialiseForm(this.clients, this.id); // Creates a form Group
  } // end ngOnInit

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';

  submitEdit() {
    // Grap the edited values from the Form
    const form = this.clientsForm.value;
    // Call the PeopleService Method 'editPerson'
    // Pass it two paramters 1.Edited form values  and 2. Current ID of the person
    // clicked on in the List
    this.cs.editClient(form, this.id);
    this.clients = this.cs.getClient();
    alert("Client has been updated");
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

  } // end initialiseForm

    openClientEditPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id;    
   
    }  //end dialogConfig
}
