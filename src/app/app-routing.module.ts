import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LandingComponent } from './landing/landing.component';
import { DriversComponent } from './drivers/drivers.component';
import { SignoutResolverService } from './auth/signout-resolver.service';
import { SignoutComponent } from './signout/signout.component';
import { TripsComponent } from './trips/trips.component';
import { canActivate } from '@angular/fire/auth-guard';
import { TripInputComponent } from './trip-input/trip-input.component';
import { DriverComponent } from './driver/driver.component';
import { DriverActivationResolverService } from './resolvers/driver-activation-resolver.service';
import { TripComponent } from './trip/trip.component';
import { DriverInputComponent } from './driver-input/driver-input.component';
import { MenuComponent } from './menu/menu.component';
import { TripsCommissioningComponent } from './trips-commissioning/trips-commissioning.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'drivers/new',
    component: DriverInputComponent
  },
  {
    path: 'driver',
    component: DriverComponent,
    children:[
      {
        path: ':cell',
        component: TripsComponent,
        resolve: {
          driverActivation: DriverActivationResolverService
        }
      },
      {
        path: ':cell/commissioning',
        component: TripsCommissioningComponent,
        resolve: {
          driverActivation: DriverActivationResolverService
        }
      }
    ]
  },
  {
    path: 'trips',
    component: TripsComponent,
    // ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'trips/new',
    component: TripInputComponent
  },
  {
    path: 'trips/commissioning',
    component: TripsCommissioningComponent
  },
  // {
  //   path: 'trips',
  //   redirectTo: 'trips'
  // },
  {
    path: 'trip/:tripId',
    component: TripComponent,
  },
  {
    path: 'trip/:tripId/edit',
    component: TripInputComponent,
  },
  {
    path: 'signout',
    component: SignoutComponent,
    resolve: {
      signout: SignoutResolverService
    }
  },
  // {
  //   path: 'landing',
  //   component: LandingComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
