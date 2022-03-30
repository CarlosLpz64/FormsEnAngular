import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalesService {

  isLogged:boolean = false;
  isAdmin:boolean = true;
  nombreCine: string = "";
  idCine: string = "";
  idFuncion: number = 0;
  cineSeleccionado = false;

  constructor(private router: Router, private cookie: CookieService) { }

  //GETS
  getIsLooged(){
    return this.isLogged;
  }

  getIsAdmin(){
    return this.isAdmin;
  }

  getMiCine(){
    this.nombreCine = "No seleccionado";
    this.cookie.set("nombreCine", this.nombreCine);
    this.cookie.set("IDcine", "0");
    return this.cookie.get("nombreCine");
  }

  //SETS
  setIsLogged(data:boolean){
    this.isLogged = data;
    if (!this.isLogged){
      this.router.navigate(['/login']);
    }
  }

  setIsAdmin(data:boolean){
    this.isAdmin = data;
    if (!this.isAdmin){
      this.router.navigate(['/home']);
    }
  }

  setMiCine(nombreCine:string){
    this.nombreCine = nombreCine;
    this.cookie.set("nombreCine", nombreCine);
    this.cineSeleccionado = true;
  }

  setMiCineID(id:string){
    this.idCine = id;
    this.cookie.set("IDcine", this.idCine);

  }
}
