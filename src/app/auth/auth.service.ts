import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  watchForUser() {
    this.afAuth.user.subscribe( user => {
      if ( user ) {
        this.user = user;
        console.log('user', user);
      } else {
        this.router.navigateByUrl('login')
      }
    })
  }
}
