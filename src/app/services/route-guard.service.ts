import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from "jwt-decode";
import { GlobalConstants } from '../shared/global-contants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(public auth:AuthService,
    public router:Router,
    private snackBarService:SnackbarService) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token:any = localStorage.getItem('token');

    var tokenPayload:any;
    try{
      tokenPayload = jwt_decode(token);
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);

    }
    let expectedRole = '';

    for(let i = 0;i<expectedRoleArray.length;i++){
      if(expectedRoleArray[i] === tokenPayload.role){
        expectedRole = tokenPayload.role;
      }
    }

    if(tokenPayload.role === 'user' || tokenPayload.role === 'admin'){
      if(this.auth.isAuthenticated() && tokenPayload.role === expectedRole){
        return true;
      }
      this.snackBarService.openSnackBar(GlobalConstants.unauthorized,GlobalConstants.error);
      this.router.navigate(['/store/dashboard']);
      return false
    }
    else{
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }

  }  
}
