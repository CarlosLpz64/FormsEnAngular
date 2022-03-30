import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actor } from 'src/app/models/actor';
import { ActoresService } from 'src/app/services/actores.service';

@Component({
  selector: 'app-nuevo-actor',
  templateUrl: './nuevo-actor.component.html',
  styleUrls: ['./nuevo-actor.component.css']
})
export class NuevoActorComponent implements OnInit {

  creadoSucces = false;
  creadoDanger = false;

  nombre: string = "";
  alias: string = "";

  constructor(private miService:ActoresService) { }

  ngOnInit(): void {
    
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    alias : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  store(){
    if (this.miFormulario.valid){
      const miRequest = {
        'nombre':this.f['nombre'].value, 
        'alias':this.f['alias'].value
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

}
