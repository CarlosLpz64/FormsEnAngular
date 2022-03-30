import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcion } from 'src/app/models/funcion';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css']
})
export class FuncionesComponent implements OnInit {

  ListaModels: Funcion[] = [];
  updateSucces: boolean = false;
  updateDanger: boolean = false;
  deleteSucces: boolean = false;
  deleteDanger: boolean = false;
  sala: number = 0;
  pelicula: number = 0;
  fecha: string = "";
  id: number = 0;
  Seleccionado: boolean = false;

  

  constructor(private miService:FuncionesService, private router: Router) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  nuevoModelo(){
    this.router.navigate(['/nuevaFuncion']);
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    alias : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

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

  

  selectModel(miModelo: Funcion){
    this.Seleccionado = true;
    this.id = miModelo.funcion_id;
  }

}
