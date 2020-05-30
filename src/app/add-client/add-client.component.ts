import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientsForm: FormGroup;
  valid: any;
  errorMessage: any;

  // Create instances of FormBuilder (fb) and ClientsService (cs)
  constructor(
    private fb: FormBuilder,
    private cs: ClientsService,
    private router: Router
    
  ) { }


  ngOnInit(): void {
    // Initilises clientsForm as a database.
    this.clientsForm = this.fb.group(
      {
        name: [null],
        Pnum: [null],
        Email: [null],
        Add1: [null],
        Add2: [null],
        city: [null],
        state: [null],
        Pcode: [null]
      }
    );
  }   // end ngOnInit

  // START Validation of client details. 
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.cs.checkAdd(this.clientsForm.value); // Gets the perameters for what is considered to be valid from the clients.service.ts
    if (this.valid == "pass") {
      this.cs.addClient(this.clientsForm.value);
      alert("Client added to database" ) ;
      this.clientsForm.reset();
      this.router.navigate(['/clientlist']);

    }
    if (this.valid == "nameFail") {
      this.errorMessage = "* You must enter a name";
    }

    else if (this.valid == "sameNameFail") {
      this.errorMessage = "* This client already exists";
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
}
// END Validation of client details.
