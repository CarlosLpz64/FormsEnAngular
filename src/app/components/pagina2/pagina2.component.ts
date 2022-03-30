import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curp } from 'src/app/models/curp';
import { CurpService } from 'src/app/services/curp.service';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component implements OnInit {
  
  curpUser!: Curp;
  creadoSucces = false;
  creadoDanger = false;

  constructor(private curpService:CurpService, private router: Router) { }

  ngOnInit(): void {
  }

  miFormulario = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(10)]),
    birthday : new FormControl('', [Validators.required]),
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }
  store(){
    if (this.miFormulario.valid){
      const miRequest = {
        'username':this.f['username'].value, 
        'email':this.f['email'].value, 
        'password':this.f['password'].value, 
        'birthday':this.f['birthday'].value 
      }
      console.log(miRequest);
      this.curpService.store(miRequest).subscribe({
          next: () => [console.log("Usuario creado"), this.creadoSucces=true, this.creadoDanger=false, alert("Usuario creado correctamente") ,this.router.navigate(['/login'])],
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
