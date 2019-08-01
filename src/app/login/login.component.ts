import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { auth } from 'firebase/app'
import { WindowService } from '../window.service';
import { AngularFireAuth } from '@angular/fire/auth';

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

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

  windowRef: any;
  phoneN = new PhoneNumber();

  verificationCode: number;
  user: any;

  constructor(private windowS: WindowService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.windowRef = this.windowS.windowRef;
    this.windowRef.recatpchaVerifier = new auth.RecaptchaVerifier('recaptcha-widget');
    this.windowRef.recatpchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recatpchaVerifier;
    const num = `+1${this.phoneNumber.value}`;
    this.afAuth.auth.signInWithPhoneNumber(num, appVerifier)
      .then(res => {
        this.windowRef.confirmationResult = res;
        console.log('confirm phone', res);
      })
      .catch( err => console.log('error:', err))
  }

  verifyLoginCode() {
    console.log('code is',this.verificationCode)
    this.windowRef.confirmationResult
      .confirm(this.verificationCode.toString())
      .then( res => {
        this.user = res.user;
        console.log('user:', res)
      })
      .catch( err => {
        console.log('verify error', err)
      })
  }

}
