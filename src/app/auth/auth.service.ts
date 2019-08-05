import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { storeDriverInformation, storeAllDriversInformation } from '../actions/app.actions';
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
        this.store.dispatch( storeDriverInformation({ payload: doc.data() as DriverI.Info}))
        this.router.navigateByUrl('trips')
        this.watchForAllDrivers();

        // });
      }
    )
  }

  watchForAllDrivers(){
    this.subscriptions.push(
      this.afs.collection('drivers').snapshotChanges().subscribe(
        response => {
          const drivers = response.map(({payload}) => {
            return payload.doc.data();
          }) as DriverI.Info[];

          this.store.dispatch( storeAllDriversInformation({ payload: drivers }))
          console.log('dirvers collection', drivers);
          // response.docs.forEach( doc => {
          //   console.log('driver', doc.data())
          // })
        }
      )
    )
  }

  signUserOut(){
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }

  ngOnDestroy() {
    this.subscriptions.forEach( subscriber => subscriber && subscriber.unsubscribe())
  }
}
