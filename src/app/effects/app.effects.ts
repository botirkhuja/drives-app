import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppEffects implements OnInitEffects {

  constructor(private actions$: Actions, private authS$: AuthService) {}

  ngrxOnInitEffects(): Action {
    this.authS$.watchForUser();
    return null;
  }
}
