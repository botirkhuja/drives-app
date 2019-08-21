import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, tripsSelector, isAdminSelector, commissioningTripsSelector } from '../reducers';
import { AuthService } from '../auth/auth.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-trips-commissioning',
  templateUrl: './trips-commissioning.component.html',
  styleUrls: ['./trips-commissioning.component.scss']
})
export class TripsCommissioningComponent implements OnInit {
  trips$: Observable<TripI.Info[]>;
  isAdmin$: Observable<boolean>;
  selectedTrip: TripI.Info[];

  constructor(
    private authS: AuthService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.trips$ = this.store.pipe( select( commissioningTripsSelector ));
    this.isAdmin$ = this.store.pipe( select( isAdminSelector ));
  }

  updateHandler(selectedTrips: MatListOption[]) {
    const trips = selectedTrips.map<TripI.Info>( trip => ({ ...trip.value }));
    this.authS.markTripsCommissioned(trips)
  }

}
