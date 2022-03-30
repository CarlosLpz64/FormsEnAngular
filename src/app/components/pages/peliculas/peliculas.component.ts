import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  ListaModels: Pelicula[] = [];
  updateSucces: boolean = false;
  updateDanger: boolean = false;
  deleteSucces: boolean = false;
  deleteDanger: boolean = false;
  //VARIABLES MODELO
  id: number = 0;

  nombre: string = "";
  duracion: number = 0;
  descripcion: string = "";
  nombreCategoria: string = "";
  nombreDirector: string = "";
  nombreProductora: string = "";

  Seleccionado: boolean = false;

  constructor(private miService:PeliculasService,  private router: Router) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  nuevoModelo(){
    this.router.navigate(['/nuevaPelicula']);
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    duracion : new FormControl('', [Validators.required]),
    descripcion : new FormControl('', [Validators.required]),
    nombreCategoria : new FormControl('', [Validators.required]),
    nombreDirector : new FormControl('', [Validators.required]),
    nombreProductora : new FormControl('', [Validators.required])
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
        'duracion':this.f['duracion'].value,
        'descripcion':this.f['descripcion'].value,
        'nombreCategoria':this.f['nombreCategoria'].value,
        'nombreDirector':this.f['nombreDirector'].value,
        'nombreProductora':this.f['nombreProductora'].value 
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

  selectModel(miModelo: Pelicula){
    /*
    this.Seleccionado = true;
    this.id = miModelo.id;
    this.nombre = miModelo.nombre;
    */
  }
}
