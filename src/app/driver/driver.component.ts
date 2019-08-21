import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, driverInfoSelector, tripsCountSelector, commissionPriceSelector } from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  driver$: Observable<DriverI.Info>;
  tripsCount$: Observable<number>;
  commission$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.driver$ = this.store.pipe(
      select(driverInfoSelector)
    );
    this.tripsCount$ = this.store.pipe(
      select(tripsCountSelector)
    );
    this.commission$ = this.store.pipe(
      select(commissionPriceSelector)
    );
  }

}
