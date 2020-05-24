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

  // Make my 'peopleForm' a FormGroup
  clientsForm: FormGroup;

  //router
  id: number;
  private sub: any;
  //people array
  clients: any;
  jobs: any;

  ngOnInit() {
    // Call the PeopleService Method 'getPeopleArray'
    // returns all the people data
    this.clients = this.cs.getClient();
    this.jobs = this.js.getJob()

    // This code graps the "id" from the URL
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    });

    } // end ngOnInit


    openClientPage(id: number): void {
     
        // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
        data: id    
   
    }  //end dialogConfig
    
    deleteClient(id) {
      if (confirm("Are you sure you want to delete this client?")) {
        console.log("in delete :" + id)
        this.cs.deleteClient(this.id);
      }
      
    }
}






