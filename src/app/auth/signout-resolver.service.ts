import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class SignoutResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('login');
    return of(true);
  }
}
