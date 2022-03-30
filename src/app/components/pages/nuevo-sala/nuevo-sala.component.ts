import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cine } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';
import { SalasService } from 'src/app/services/salas.service';

@Component({
  selector: 'app-nuevo-sala',
  templateUrl: './nuevo-sala.component.html',
  styleUrls: ['./nuevo-sala.component.css']
})
export class NuevoSalaComponent implements OnInit {

  ListaCines: Cine[] = [];
  
  creadoSucces = false;
  creadoDanger = false;

  numero: number = 0;

  cine: number = 0;
  Cine = {
    nombre: ""
  };
  nombreCine:string = "Cine no seleccionado";

  constructor(private miService:SalasService, private cineService:CinesService) { }

  ngOnInit(): void {
    this.cargarCine();
  }

  miFormulario = new FormGroup({
    numero : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  store(){
    if (this.miFormulario.valid){
      const miRequest = {
        'numero':this.f['numero'].value,
        'cine':this.cine
      }
      console.log(miRequest);
      this.miService.store(miRequest).subscribe({
          next: () => [console.log("modelo creado"), this.creadoSucces=true, this.creadoDanger=false],
          error: (e) => [console.error(e),this.creadoDanger=true, this.creadoSucces=false],
          complete: () => console.info('complete') 
      })
    }else {
      console.log("Formulario inválido");
      this.creadoDanger=true;
      this.creadoSucces=false;
    }
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

  selectCine(Cine: Cine){
    this.cine = Cine.id;
    this.nombreCine = Cine.nombre;
  }


}
