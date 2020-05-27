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
  clients: any

  ngOnInit() {
    // Gets clients database
    this.clients = this.cs.getClient();
    // Gets the clients id
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.initialiseForm(this.clients, this.id); // Creates a form Group
  } 

  message: string = "";
  editShowBut: boolean = true;
  bntStyle: string = '';
  // Submits edit and reroutes to the clients page.
  submitEdit() {
    const form = this.clientsForm.value;
    this.cs.editClient(form, this.id);
    this.clients = this.cs.getClient();
    alert("Client has been updated");
    this.router.navigate(['/clientinfo', this.id]);
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
