import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Curp } from 'src/app/models/curp';
import { ActoresService } from 'src/app/services/actores.service';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {
  ListaModels: Actor[] = [];
  updateSucces: boolean = false;
  updateDanger: boolean = false;
  deleteSucces: boolean = false;
  deleteDanger: boolean = false;
  nombre: string = "";
  alias: string = "";
  id: number = 0;
  Seleccionado: boolean = false;

  

  constructor(private miService:ActoresService, private router: Router) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  nuevoModelo(){
    this.router.navigate(['/nuevoActor']);
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

  updateModel(){
    if (this.miFormulario.valid){
      const miRequest = {
        'nombre':this.f['nombre'].value, 
        'alias':this.f['alias'].value
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

  selectModel(miModelo: Actor){
    this.Seleccionado = true;
    this.id = miModelo.id;
    this.nombre = miModelo.nombre;
    this.alias = miModelo.alias;
  }
}
