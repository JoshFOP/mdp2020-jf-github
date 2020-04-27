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

  // Create instances of FormBuilder (fb) and PeopleServices (ps)
  constructor(
    private fb: FormBuilder,
    private cs: ClientsService,
    private router: Router
    
  ) { }


  ngOnInit(): void {
    // INITIALFORM FUNCTION  (bottom of page)
    // This will create our HTML form "peopleForm" as a FormGroup
    // and define our forms Controls. Later we can access validation functions
    // from the FormBuilder helper class. eg validate an email...
    // this validation can be real time
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

    // ------------VALIDATION USING 'OBSERVABLE -------------------//
    // Here our poeopleForm formgroup has an Observable method called 'valueChanges'
    // this will map to any of our form fields in real time.  So we can validate the data 
    // entered into the form field by the user in real time and give then feedback 
    this.clientsForm.valueChanges 
      .subscribe((formData) => {
          // formData represents all of the form field elements
          // Look in the console and look at specific fields as you enter data
          console.log(formData.name);
      })  // END OF "OSERVABLE "VALIDATIONS

  }   // end ngOnInit

  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.cs.checkAdd(this.clientsForm.value);
    if (this.valid == "pass") {
      this.cs.addClient(this.clientsForm.value);
      alert("Data added to database" ) ;
      this.clientsForm.reset();

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
  this.router.navigate(['/clientlist']);
  }
}
