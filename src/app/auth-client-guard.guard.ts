import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuardGuard implements CanActivate {

  constructor(private _auth : AuthService,private _router : Router){};

  private async test(){

    return new Promise(async (resolve,reject)=>{

      if(!(!!localStorage.getItem('authorization'))){
        resolve(false)
      }
      
      (await this._auth.getInformation()).subscribe(
        res => {
          
          if(res.role ==='client'){
            resolve(true);
          }
        else resolve(false)},
        err => {
          if(err instanceof HttpErrorResponse){
            resolve(false)
          }
        }
      )
    })
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      let a = await this.test();
      let b = !! a;
      return b;
  }
  
}
