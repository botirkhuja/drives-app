import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { LandingComponent } from './landing/landing.component';
import { DriversComponent } from './drivers/drivers.component';
import { SignoutResolverService } from './auth/signout-resolver.service';
import { SignoutComponent } from './signout/signout.component';
import { TripsComponent } from './trips/trips.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'landing',
  //   pathMatch: 'full'
  // },
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
    path: 'trips',
    component: TripsComponent
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
