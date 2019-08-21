import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, userDriverInfoSelector } from '../reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  subscription: Subscription;
  driverInfo: DriverI.Info;
  navigatableLinks: NavigatableLink[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.pipe( select( userDriverInfoSelector )).subscribe(
      driverInfo => {
        this.driverInfo = driverInfo;
        this.constructLinks();
      }
    )
  }

  constructLinks() {
    this.navigatableLinks = [];
    if (this.driverInfo) {
      this.navigatableLinks.push({
        link: 'trips',
        label: 'Trips'
      })
      if (this.driverInfo.role.admin) {
        this.navigatableLinks.push({
          link: 'drivers',
          label: 'Drivers'
        })
      }
      this.navigatableLinks.push({
        link: 'signout',
        label: 'Sign Out'
      })
    } else {
      this.navigatableLinks.push({
        link: 'login',
        label: 'Login'
      })
    }
  }

}
