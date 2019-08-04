import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { storeUserInformation } from '../actions/app.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  user;
  subscriptions: Subscription[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
    private afs: AngularFirestore,
  ) { }

  watchForUser() {
    this.subscriptions.push(
      this.afAuth.user.subscribe( user => {
        if ( user ) {
          this.user = user;
          this.getUserInformation();
          // this.store.dispatch( storeUserInformation({ payload: user }));
          // console.log('user', user);
        } else {
          this.router.navigateByUrl('login')
        }
      })
    );
  }

  getUserInformation(){
      // this.afs.collection('drivers', ref => ref.where('cell', '==', this.user.phoneNumber))
      this.afs.doc('drivers/'+this.user.phoneNumber).ref
        .get().then( doc => {
          // response.docs.forEach( doc => {
          this.store.dispatch( storeUserInformation({ payload: doc.data() as DriverI.Info}))
          this.router.navigateByUrl('trips')

          // });
        }
      )
  }

  ngOnDestroy() {
    this.subscriptions.forEach( subscriber => subscriber && subscriber.unsubscribe())
  }
}
