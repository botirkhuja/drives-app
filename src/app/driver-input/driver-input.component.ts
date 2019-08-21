import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-driver-input',
  templateUrl: './driver-input.component.html',
  styleUrls: ['./driver-input.component.scss']
})
export class DriverInputComponent implements OnInit {
  driverForm: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.driverForm = this.fb.group({
      car: [null, Validators.required],
      cell: [null, [ Validators.required, Validators.pattern(/\+1[0-9]{10}/)]],
      name: [null, Validators.required],
    })
  }

  addNewDriver() {
    this.auth.uploadNewDriver(this.driverForm.value);
  }

}
