import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { CustomSerializer } from './custom-route-serializer';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DriversComponent } from './drivers/drivers.component';
import { SignoutComponent } from './signout/signout.component';
import { TripsComponent } from './trips/trips.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    LandingComponent,
    AdminComponent,
    SideMenuComponent,
    DriversComponent,
    SignoutComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: CustomSerializer,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
