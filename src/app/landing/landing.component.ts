import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, isAdminSelector, toolbarBottonsForAdminSelector } from '../reducers';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  subscription: Subscription;
  isAdmin$: Observable<boolean>;
  actionButtons: Observable<any[]>;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private store: Store<AppState>,
    private coreS: CoreService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isAdmin$ = this.store.pipe( select( isAdminSelector ));
    this.actionButtons = this.store.pipe( select( toolbarBottonsForAdminSelector ));
  }

  // addHandler() {
  //   const url = window.location.pathname;
  //   let newUrl = url;
  //   if (url.includes('driver')) {
  //     newUrl = '/drivers/new';
  //   } else {
  //     newUrl = '/trips/new';
  //   }
  //   this.router.navigateByUrl(newUrl);
  // }

  // navigateToCommission() {
  //   this.coreS.navigateByUrl('commission');
  // }

  actionButtonHandler(action) {
    this.router.navigateByUrl(action.url);
    console.log(action)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }

}
