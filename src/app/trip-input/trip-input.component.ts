import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState, allDriverInfoSelector, tripInfoSelector } from '../reducers';
import { Observable, Subscription } from 'rxjs';
import { putNewTrip, updateTrip } from '../actions/app.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-input',
  templateUrl: './trip-input.component.html',
  styleUrls: ['./trip-input.component.scss']
})
export class TripInputComponent implements OnInit, OnDestroy {
  drivers$: Observable<DriverI.Info[]>;
  mobile = true;
  tollIncludedControl = new FormControl(null);

  tripForm: FormGroup;
  tripSubscription: Subscription;
  editTripId = null;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tripForm = this.fb.group({
      pickupDate: [null, Validators.required ],
      pickup: [null, Validators.required ],
      dropoff: [null, Validators.required ],
      cell: [null, [Validators.required, Validators.pattern(new RegExp('[0-9]{10}', 'g'))] ],
      price: [null, Validators.required ],
      tollIncluded: this.tollIncludedControl,
      tollAmount: [ null ],
      driverID: [ null ]
    });

    this.drivers$ = this.store.pipe( select( allDriverInfoSelector ));
    const { tripId } = this.route.snapshot.params;
    if ( tripId ) {
      this.editTripId = tripId;
      this.editSelectedTrip();
    }

    this.tollIncludedControl.valueChanges.subscribe( condition => {
      if ( condition ) {
        this.tollIncludedControl.setValidators(Validators.required);
      } else {
        this.tollIncludedControl.setValidators(null);
      }
      this.tripForm.updateValueAndValidity();
    })
  }

  addNewTrip(){
    let action;
    if (this.editTripId) {
      action = updateTrip({ payload: { trip: this.tripForm.value, id: this.editTripId }})
    } else {
      action = putNewTrip({ payload: this.tripForm.value })
    }
    this.store.dispatch( action )
  }

  editSelectedTrip() {
    this.tripSubscription = this.store.pipe( select( tripInfoSelector )).subscribe( trip => {
      if (trip) {
        this.tripForm.setValue({
          pickupDate: trip.pickupDate,
          pickup: trip.pickup,
          dropoff: trip.dropoff,
          cell: trip.cell,
          price: trip.price,
          tollIncluded: trip.tollIncluded,
          tollAmount: trip.tollAmount,
          driverID: trip.driverID
        });
      }
    })
  }

  ngOnDestroy() {
    if (this.tripSubscription) {
      this.tripSubscription.unsubscribe();
    }
  }

}
