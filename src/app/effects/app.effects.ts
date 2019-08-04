import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { RouterStateUrl } from '../custom-route-serializer';

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

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      tap(({payload: {routerState}} ) => {
        console.log(routerState);
      })
    ),
  {dispatch: false});

  constructor(private actions$: Actions, private authS$: AuthService) {}
}
