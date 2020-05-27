import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';


@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  constructor(private cs: ClientsService) {
  }
  
  clients: any;

  ngOnInit(): void {
    // calls upon the client database
    this.clients = this.cs.getClient() 
    console.log(this.clients) 
  }
}