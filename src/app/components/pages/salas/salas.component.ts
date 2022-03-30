import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cine } from 'src/app/models/cine';
import { Sala } from 'src/app/models/sala';
import { SalasService } from 'src/app/services/salas.service';
import { CinesService } from 'src/app/services/cines.service';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  ListaModels: Sala[] = [];
  ListaCines: Cine[] = [];

  updateSucces: boolean = false;
  updateDanger: boolean = false;
  deleteSucces: boolean = false;
  deleteDanger: boolean = false;

  numero: number = 0;
  cine: number = 0;
  id: number = 0;
  Cine = {
    nombre: ""
  };
  nombreCine:string = "Cine no seleccionado";

  Seleccionado: boolean = false;

  constructor(
    private miService:SalasService, 
    private router: Router,
    private cineService:CinesService) { }

  ngOnInit(): void {
    this.cargarInfo();
    this.cargarCine();
  }

  nuevoModelo(){
    this.router.navigate(['/nuevaSala']);
  }

  miFormulario = new FormGroup({
    numero : new FormControl('', [Validators.required])
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

  cargarCine(){
    this.cineService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.ListaCines = r.data
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  updateModel(){
    if (this.miFormulario.valid){
      const miRequest = {
        'numero':this.f['numero'].value, 
        'cine':this.cine
      }
      console.log(miRequest);
      
      this.miService.update(miRequest, this.id).subscribe({
          next: () => [console.log("Actualizado"), this.updateSucces=true, this.updateDanger=false, this.cargarInfo()],
          error: (e) => [console.error(e),this.updateDanger=true, this.updateSucces=false],
          complete: () => console.info('complete') 
      })
    }else {
      console.log("Formulario inválido");
      this.updateDanger=true;
      this.updateSucces=false;
    }
  }

  deleteModel(){
    this.miService.deleteUser(this.id).subscribe({
          next: () => [console.log("Eliminado correctamente"), this.deleteSucces=true, this.deleteDanger=false, this.cargarInfo(), this.Seleccionado = false],
          error: (e) => [console.error(e),this.deleteDanger=true, this.deleteSucces=false],
          complete: () => console.info('complete') 
      })
  }

  selectModel(miModelo: Sala){
    this.Seleccionado = true;
    this.id = miModelo.id;
    this.numero = miModelo.numero;
    this.cine = miModelo.cine;
    this.Cine = miModelo.Cine;
  }

  selectCine(Cine: Cine){
    this.cine = Cine.id;
    this.nombreCine = Cine.nombre;
  }
}
