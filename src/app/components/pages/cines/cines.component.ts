import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cine } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';
import { GlobalesService } from 'src/app/services/globales.service';

@Component({
  selector: 'app-cines',
  templateUrl: './cines.component.html',
  styleUrls: ['./cines.component.css']
})
export class CinesComponent implements OnInit {

  ListaModels: Cine[] = [];
  nombre: string = "";
  direccion: string = "";
  id: number = 0;

  constructor(private router: Router, 
    public variablesGlobales: GlobalesService, 
    private miService:CinesService) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  nuevoModelo(){
    this.router.navigate(['/nuevoCine']);
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    direccion : new FormControl('', [Validators.required])
  });


  cargarInfo(){
    this.miService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.ListaModels = r.data
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  selectModel(miModelo: Cine){
    this.id = miModelo.id;
    this.nombre = miModelo.nombre;
    this.direccion = miModelo.direccion;
    this.variablesGlobales.setMiCine(this.nombre);
    this.variablesGlobales.setMiCineID(this.id.toString());
    this.router.navigate(['/home']);
  }

}
