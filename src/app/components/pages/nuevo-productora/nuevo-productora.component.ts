import { Component, OnInit } from '@angular/core';
import { ProductorasService } from 'src/app/services/productoras.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nuevo-productora',
  templateUrl: './nuevo-productora.component.html',
  styleUrls: ['./nuevo-productora.component.css']
})
export class NuevoProductoraComponent implements OnInit {

  creadoSucces = false;
  creadoDanger = false;

  nombre: string = "";

  constructor(private miService:ProductorasService) { }

  ngOnInit(): void {
    
  }

  miFormulario = new FormGroup({
    nombre : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  store(){
    if (this.miFormulario.valid){
      const miRequest = {
        'nombre':this.f['nombre'].value
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
