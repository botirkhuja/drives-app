import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { AuthService } from '../auth/auth.service';
import { tap, exhaustMap } from 'rxjs/operators';
import { ROUTER_NAVIGATED, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';
import { putNewTrip, deactivateDriver, updateTrip } from '../actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      tap(() => this.authS$.watchForUser())
    ),
  {dispatch: false});

  routeListener$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      tap(({payload: {routerState}}: {payload: {routerState: SerializedRouterStateSnapshot}}) => {
        if(routerState.url === '/trips' || routerState.url === '/drivers') {
          this.store$.dispatch( deactivateDriver())
        }
        const { tripId } = routerState.root.firstChild.params;
        if ( tripId ) {
          this.authS$.getTripById( tripId )
        }
        console.log(routerState)
      })
    ),
    {dispatch: false}
  );

  newTripPutter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putNewTrip),
      tap(({ payload }) => {
        this.authS$.uploadNewTrip(payload);
      })
    ),
    { dispatch: false }
  )

  tripUpdater$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTrip),
      tap(({ payload }) => {
        this.authS$.updateATrip(payload.trip, payload.id);
      })
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private authS$: AuthService, private store$: Store<AppState>) {}
}
