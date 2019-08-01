import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // form = new FormGroup({
  //   email: new FormControl(null, Validators.required),
  //   password: new FormControl(null, Validators.required)
  // })

  signupForm = new FormControl(null, Validators.pattern(/[0-9]{10}/g))

  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
    new auth.RecaptchaVerifier('')
  }

}
