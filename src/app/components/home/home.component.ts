import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthAdmin } from 'src/app/models/auth-admin';
import { CurpService } from 'src/app/services/curp.service';
import { GlobalesService } from 'src/app/services/globales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  respuesta: any;
  esAdmin: boolean = false;

  constructor(
    private curpService:CurpService,
    private variablesGlobales: GlobalesService, 
    private cookie: CookieService, 
    private router: Router) { }

  ngOnInit(): void {

  }


  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.loginForm.controls; }

  login(){
    if (this.loginForm.valid){
      const miRequest = {
        'email':this.f['email'].value, 
        'password':this.f['password'].value 
      }
      this.curpService.isLoading = true;
      console.log(miRequest);
      this.curpService.login(miRequest).subscribe({
        next: (r) => [
        console.log("Respuesta: " + r.id.id),
        this.cookie.set("Token", r.data.token),
        this.cookie.set("ID", r.id.id),  
        this.variablesGlobales.setIsLogged(true),
        this.setTipoUsuario(),
        this.router.navigate(['/home'])
      ],
        error: (e) => [console.error(e), this.curpService.isLoading = false],
        complete: () => [console.info('complete'), this.curpService.isLoading = false]
    })
    }
  }

  setTipoUsuario(){
    if (this.variablesGlobales.getIsLooged()){
      this.curpService.verificarAdmin(this.cookie.get("ID")).subscribe({
        next: (r:AuthAdmin) => [this.esAdmin = r.data, console.log("Next: " + r)],
        error: (e) => [console.error(e), this.esAdmin = false,  this.variablesGlobales.setIsAdmin(false)],
        complete: () => [console.info('complete'), this.variablesGlobales.setIsAdmin(this.esAdmin)]
      })
    }
  }

  //COOKIES
  //SET: this.cookie.set("nombre", "valor")
  //GET: this.cookie.get("nombre")

}
