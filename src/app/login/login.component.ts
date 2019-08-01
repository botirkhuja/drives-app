import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

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

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
    window['recaptchaVerifier'] = new auth.RecaptchaVerifier('recaptcha-container');
    window['recaptchaVerifier'].render();
  }

}
