import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, tripInfoSelector, isAdminSelector, allDriverInfoSelector, driverSelector } from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  trip$: Observable<TripI.Info>;
  isAdmin$: Observable<boolean>;
  drivers$: Observable<DriverI.Info[]>;
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.trip$ = this.store.pipe( select( tripInfoSelector ));
    this.isAdmin$ = this.store.pipe( select( isAdminSelector ));
    // this.drivers$ = this.store.pipe( select( driverSelector, {cell}));
  }

}
