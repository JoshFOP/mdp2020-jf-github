import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cs: ClientsService,
    private js: JobsService) { }

  clientsForm: FormGroup;
  id: number;
  private sub: any;
  clients: any;
  jobs: any;

  ngOnInit() {
    // Gets the client and job databases from clients.service.ts and jobs.service.ts
    this.clients = this.cs.getClient();
    this.jobs = this.js.getJob()

    // Fetches the id of the client
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
    });
  }
  // Opens dialogue box to confirm the deletion of the client.  
  deleteClient(id) {
    if (confirm("Are you sure you want to delete? " + this.clients[this.id].name)) {
      this.cs.deleteClient(this.id);
    }
  }
}






