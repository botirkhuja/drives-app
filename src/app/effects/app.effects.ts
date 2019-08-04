import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private authS$: AuthService) {}
}
