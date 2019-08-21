import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-compensation-input',
  templateUrl: './compensation-input.component.html',
  styleUrls: ['./compensation-input.component.scss']
})
export class CompensationInputComponent implements OnInit {
  compensationForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.compensationForm = this.fb.group({
      date: [ new Date().toISOString(), Validators.required],
      driver: [ null, [ Validators.required ]],
      amount: [ null, Validators.required ],
    })
  }

  addNewCompensation() {

  }

}
