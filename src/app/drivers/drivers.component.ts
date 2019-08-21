import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, allDriverInfoSelector, isAdminSelector } from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers$: Observable<DriverI.Info[]>;
  isAdmin$: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.drivers$ = this.store.pipe( select( allDriverInfoSelector ));
    this.isAdmin$ = this.store.pipe( select( isAdminSelector ));
  }

}
