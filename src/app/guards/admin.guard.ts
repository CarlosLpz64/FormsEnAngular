import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthAdmin } from '../models/auth-admin';
import { UserAuth } from '../models/user-auth';
import { CurpService } from '../services/curp.service';
import { GlobalesService } from '../services/globales.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  respuesta!: AuthAdmin;
  esAdmin!: boolean;

  constructor(
    private curpSvc: CurpService, 
    private variablesGlobales: GlobalesService,
    private cookie: CookieService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    this.curpSvc.isLoading = true;

    this.curpSvc.verificarAdmin(this.cookie.get("ID")).subscribe({
      next: (r:AuthAdmin) => [this.esAdmin = r.data, console.log("Next: " + r)],
      error: (e) => [console.error(e), this.esAdmin = false,  this.variablesGlobales.setIsAdmin(false), this.curpSvc.isLoading = false],
      complete: () => [console.info('complete'), this.variablesGlobales.setIsAdmin(this.esAdmin), this.curpSvc.isLoading = false]
    })
  
    return true;
  }
  
}
