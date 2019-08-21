import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, allDriverInfoSelector, driversAndTripsSelector } from '../reducers';
import { of, Observable, Subscription } from 'rxjs';
import { activateDriver } from '../actions/app.actions';
import { tap, exhaustMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverActivationResolverService implements Resolve<boolean>  {
  subscription: Subscription;
  constructor(private store: Store<AppState>) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const { cell } = route.params;
    this.subscription = this.store.pipe( select( driversAndTripsSelector )).subscribe(([drivers, trips]) => {
      // console.log(drivers, trips);
      // return true
      if (drivers && drivers.length && trips && trips.length) {
        this.store.dispatch( activateDriver({ payload: { cell }}));
        if (this.subscription) {
          this.subscription.unsubscribe();
          console.log('ubsubscriber')
        }
        return true;
      }
    })
    // this.store.dispatch( activateDriver({ payload: { cell }}));

    // return of(true);
  }
}
