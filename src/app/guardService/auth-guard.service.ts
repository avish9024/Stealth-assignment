import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthorised = localStorage.getItem('loggedInUser');
    console.log(isAuthorised);
    if (JSON.parse(isAuthorised) !== null){
      return true;
    } else {
      window.location.href = environment.loginPageUrl;
    }
  }
}
