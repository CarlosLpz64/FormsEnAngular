import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserAuth } from '../models/user-auth';
import { CurpService } from '../services/curp.service';
import { GlobalesService } from '../services/globales.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  respuesta!: UserAuth;
  logged!: boolean;
  constructor(
    private curpSvc: CurpService, 
    private variablesGlobales: GlobalesService){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
      
    this.curpSvc.isLoading = true;

    this.curpSvc.verificarToken().subscribe({
      next: (r:UserAuth) => [this.logged = r.logged, console.log("Next: " + r)],
      error: (e) => [console.error(e), this.logged = false,  this.variablesGlobales.setIsLogged(false), this.curpSvc.isLoading = false],
      complete: () => [console.info('complete'), this.variablesGlobales.setIsLogged(this.logged), this.curpSvc.isLoading =false]
    })
  
    return true;
  }
}
