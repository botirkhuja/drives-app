import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { storeUserDriverInformation, storeAllDriversInformation, storeAllTripsInformation, getTripInformation } from '../actions/app.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  user: firebase.User;
  driverInfo: DriverI.Info;
  subscriptions: Subscription[] = [];
  userSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
    private afs: AngularFirestore,
    private location: Location,
  ) {}

  watchForUser() {
    this.userSubscription =
      this.afAuth.user.subscribe( user => {
        if ( user ) {
          this.user = user;
          this.getDriverInformation();
          // this.store.dispatch( storeUserInformation({ payload: user }));
          // console.log('user', user);
        } else {
          this.notUser();
        }
      });
  }

  getDriverInformation(){
    // this.afs.collection('drivers', ref => ref.where('cell', '==', this.user.phoneNumber))
    this.afs.doc('drivers/'+this.user.phoneNumber).ref
      .get().then( doc => {
        // response.docs.forEach( doc => {
        const driverInfo = <DriverI.Info>doc.data();
        this.driverInfo = driverInfo;
        this.storeDriverInformation(driverInfo);
        this.watchForAllTrips();
        if (driverInfo.role && driverInfo.role.admin) {
          this.watchForAllDrivers();
        }

        // });
      }
    )
  }

  notUser() {
    this.user = null;
    this.storeDriverInformation(null);
    this.unsubscribeAll();
  }

  storeDriverInformation(driver: DriverI.Info | null) {
    this.store.dispatch( storeUserDriverInformation({ payload: driver }));
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
        },
        error => {
          console.warn('Error at watching driver');
        }
      )
    )
  }

  watchForAllTrips(){

    const refCallBack = (ref: firebase.firestore.CollectionReference) => {
      if (this.driverInfo.role && this.driverInfo.role.admin) {
        return ref;
      } else {
        console.log('regular user ref called');
        return ref.where('driverID', '==', this.user.phoneNumber);
      }
    }

    this.subscriptions.push(
      this.afs.collection('trips', refCallBack).snapshotChanges().subscribe(
        response => {
          const trips = response.map(({payload}) => {
            const { doc } = payload;
            return { ...doc.data(), id: doc.id } as TripI.Info;
          });

          this.store.dispatch( storeAllTripsInformation({ payload: trips }));

          console.log('trips collection', trips);
        },
        error => {
          console.warn('Error at watching trips');
        }
      )
    )
  }

  uploadNewTrip(trip: TripI.Info){
    this.afs.collection('trips').add(trip)
      .then(doc => {
        this.router.navigate(['trip', doc.id]);
      })
      .catch(err => {
        console.log('error happened')
      })
  }

  uploadNewDriver(driver: DriverI.Info){
    this.afs.collection('drivers').doc(driver.cell).set(driver)
      .then(doc => {
        this.router.navigate(['trips']);
      })
      .catch(err => {
        console.log('error happened')
      })
  }

  updateATrip(trip: TripI.Info, id: string){
    this.afs.collection('trips').doc(id).update(trip)
      .then(() => {
        this.router.navigate(['trip', id]);
      })
      .catch(err => {
        console.log('error happened at updating trip')
      })
  }

  signUserOut(){
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }

  getTripById(id: string){
    this.afs.doc('trips/'+id).ref.get()
      .then(doc => {
        const trip = <TripI.Info>doc.data()
        this.store.dispatch( getTripInformation({ payload: trip }))
      })
      .catch(err => {
        console.warn('Caught when getting trip by id.\n', err);
      })

  }

  unsubscribeAll() {
    this.subscriptions.forEach( subscriber => subscriber && subscriber.unsubscribe())
  }

  markTripsCommissioned(trips: TripI.Info[]) {
    trips.forEach( trip => {
      const { id } = trip;
      delete trip.id;
      this.afs.collection('trips').doc(id).update({ ...trip, commissioned: true });
    });
    this.location.back();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }
}
