import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cine } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';


@Component({
  selector: 'app-nuevo-cine',
  templateUrl: './nuevo-cine.component.html',
  styleUrls: ['./nuevo-cine.component.css']
})
export class NuevoCineComponent implements OnInit {

  creadoSucces = false;
  creadoDanger = false;

  nombre: string = "";
  direccion: string = "";

  constructor(private miService:CinesService) { }

  ngOnInit(): void {
    
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    direccion : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  store(){
    if (this.miFormulario.valid){
      const miRequest = {
        'nombre':this.f['nombre'].value, 
        'direccion':this.f['direccion'].value
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
