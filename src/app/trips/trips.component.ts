import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, tripsSelector, isAdminSelector, todaysTripsSelector, futureTripsSelector, pastTripsSelector } from '../reducers';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips$: Observable<TripI.Info[]>;
  futureTrips$: Observable<TripI.Info[]>;
  pastTrips$: Observable<TripI.Info[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.trips$ = this.store.pipe( select( todaysTripsSelector ));
    this.futureTrips$ = this.store.pipe( select( futureTripsSelector ));
    this.pastTrips$ = this.store.pipe( select( pastTripsSelector ));
  }

  newHandler() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

}
