import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcion } from 'src/app/models/funcion';
import { Pelicula } from 'src/app/models/pelicula';
import { Sala } from 'src/app/models/sala';
import { FuncionesService } from 'src/app/services/funciones.service';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { SalasService } from 'src/app/services/salas.service';

@Component({
  selector: 'app-nuevo-funcion',
  templateUrl: './nuevo-funcion.component.html',
  styleUrls: ['./nuevo-funcion.component.css']
})
export class NuevoFuncionComponent implements OnInit {

  ngOnInit(): void {
    this.cargarSala();
    this.cargarPelicula();
  }

  ListaModels: Funcion[] = [];

  //SALAS
  ListaSalas: Sala[] = [];
  nombreSala:string = "Sala no seleccionada";
  idSala: number = 0;

  //PELÍCULAS
  ListaPeliculas: Pelicula[] = [];
  nombrePelicula:string = "Película no seleccionada";
  idPelicula: number = 0;


  createSucces: boolean = false;
  createDanger: boolean = false;
  fecha: string = "";
  id: number = 0;
    
  constructor(
    private http: HttpClient,
    private miService:FuncionesService,
    private salaService:SalasService,
    private peliculaService:PeliculasService
    ) { }

  miFormulario = new FormGroup({
    fecha : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  createModel(){
    if (this.miFormulario.valid){
      const miRequest = {
        'fecha':this.f['fecha'].value,
        'pelicula':this.idPelicula,
        'sala':this.idSala
      }
      console.log(miRequest);
      
      this.miService.store(miRequest).subscribe({
          next: () => [console.log("Creado"), this.createSucces=true, this.createDanger=false],
          error: (e) => [console.error(e),this.createDanger=true, this.createSucces=false],
          complete: () => console.info('complete') 
      })
    }else {
      console.log("Formulario inválido");
      this.createDanger=true;
      this.createSucces=false;
    }
  }

  cargarSala(){
    this.salaService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.ListaSalas = r.data
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  cargarPelicula(){
    this.peliculaService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.ListaPeliculas = r.data
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  selectSala(sala: Sala){
    this.idSala = sala.id;
    this.nombreSala = sala.Cine.nombre + " - " + sala.numero;
  }

  selectPelicula(pelicula: Pelicula){
    this.idPelicula = pelicula.id;
    this.nombrePelicula = pelicula.nombre;
  }


}
