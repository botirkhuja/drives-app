import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { auth } from 'firebase/app'
import { WindowService } from '../window.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  windowRef: Window & Partial<{
    confirmationResult: auth.ConfirmationResult;
    recaptchaVerifier: auth.RecaptchaVerifier;
    recaptchaWidgetId: number;
  }>;

  canEnterConfirmationCode: boolean;

  verificationCode: number;
  user: any;

  constructor(private windowS: WindowService, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.windowRef = this.windowS.windowRef;
    // this.windowRef.recatpchaVerifier = new auth.RecaptchaVerifier('recaptcha-widget');

  }

  ngAfterViewInit() {
    this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': () => this.sendLoginCode()
    });
    this.renderRecaptchaVerifier();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = `+1${this.phoneNumber.value}`;
    this.afAuth.auth.signInWithPhoneNumber(num, appVerifier)
      .then( res => {
        this.windowRef.confirmationResult = res;
        this.canEnterConfirmationCode = true;
      })
      .catch( error => {
        this.handleError(error);
        this.renderRecaptchaVerifier()
      })
  }

  handleError(error: Error){
    this.phoneNumberErrorMessage = error.message;
    // this.windowRef.recaptchaWidgetId = null;
    this.phoneNumber.markAsTouched();
  }

  renderRecaptchaVerifier(){
    this.windowRef.recaptchaVerifier.render()
      .then( widgetId => {
        this.windowRef.recaptchaWidgetId = widgetId;
      }).catch( error => {
        this.handleError(error);
        console.warn('Error at recaptcha verifier render');
      });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode.toString())
      .then( res => {
        this.router.navigateByUrl('menu');
      });
  }

  signOut(event) {
    this.afAuth.auth.signOut();
  }
}
