import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent 
{
  myForm: FormGroup; 

  constructor() 
  {
    this.myForm = new FormGroup({ 
      birthDate: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      hireDate: new FormControl()
    });
  }
}
