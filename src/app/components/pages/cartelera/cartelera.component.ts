import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cartelera } from 'src/app/models/cartelera';
import { GlobalesService } from 'src/app/services/globales.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  ListaModels: Cartelera[] = [];

  constructor(
    private miService:PeliculasService, 
    private router: Router, 
    public variablesGlobales: GlobalesService,
    private cookie: CookieService
    ) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  verAsientos(id: number){
    this.variablesGlobales.idFuncion = id;
    this.router.navigate(['/asientos']);
  }

  cargarInfo(){
    if (this.cookie.get("IDcine") != "0" && this.cookie.get("IDcine") != ""){
      this.miService.indexCartelera().subscribe({
        next: (r) => [
        console.log(r),
        this.ListaModels = r.data
      ],
        error: (e) => [console.error(e)],
        complete: () => console.info('complete') 
      })
    }
  }

}
