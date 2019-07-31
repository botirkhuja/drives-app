import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  phoneNumberRegex = new RegExp('[0-9]{10}', 'g')
  phoneNumber = new FormControl(
    null, 
    Validators.compose([
      Validators.required,
      Validators.pattern(this.phoneNumberRegex)
    ])
  )

  constructor() { }

  ngOnInit() {
  }

}
