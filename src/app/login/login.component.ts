import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { auth } from 'firebase/app'
import { WindowService } from '../window.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  phoneNumberErrorMessage: string;

  windowRef: any;

  verificationCode: number;
  user: any;

  constructor(private windowS: WindowService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.windowRef = this.windowS.windowRef;
    // this.windowRef.recatpchaVerifier = new auth.RecaptchaVerifier('recaptcha-widget');
    this.windowRef.recatpchaVerifier = new auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': () => this.sendLoginCode()
    });

    (this.windowRef.recatpchaVerifier as auth.RecaptchaVerifier).render()
      .then( widgetId => {
        this.windowRef.recaptchaWidgetId = widgetId;
      });
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recatpchaVerifier;
    const num = `+1${this.phoneNumber.value}`;
    this.afAuth.auth.signInWithPhoneNumber(num, appVerifier)
      .then(res => {
        this.windowRef.confirmationResult = res;
      })
      .catch( err => {
        this.phoneNumberErrorMessage = err.message;
        this.phoneNumber.markAsTouched();
        (this.windowRef.recaptchaVerifier as auth.RecaptchaVerifier).render();
      })
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode.toString())
  }

  signOut(event) {
    this.afAuth.auth.signOut();
  }
}
