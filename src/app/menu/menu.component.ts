import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, userDriverInfoSelector } from '../reducers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

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
      if (this.driverInfo.role && this.driverInfo.role.admin) {
        this.navigatableLinks.push({
          link: 'drivers',
          label: 'Drivers'
        })
      } else {
        this.navigatableLinks.push({
          link: 'driver',
          label: 'Profile'
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
