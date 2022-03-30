import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Curp } from 'src/app/models/curp';
import { CurpService } from 'src/app/services/curp.service';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {

  users: Curp[] = [];
  updateSucces: boolean = false;
  updateDanger: boolean = false;
  deleteSucces: boolean = false;
  deleteDanger: boolean = false;
  username: string = "";
  birthday: string = "";
  id: number = 0;
  userSelected: boolean = false;

  

  constructor(private curpService:CurpService) { }

  ngOnInit(): void {
    this.cargarInfo();
  }

  miFormulario = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthday : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miFormulario.controls; }

  cargarInfo(){
    this.curpService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.users = r
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  update(){
    if (this.miFormulario.valid){
      const miRequest = {
        'username':this.f['username'].value, 
        'birthday':this.f['birthday'].value
      }
      console.log(miRequest);
      this.curpService.update(miRequest, this.id).subscribe({
          next: () => [console.log("Usuario actualizado"), this.updateSucces=true, this.updateDanger=false, this.cargarInfo()],
          error: (e) => [console.error(e),this.updateDanger=true, this.updateSucces=false],
          complete: () => console.info('complete') 
      })
    }else {
      console.log("Formulario inválido");
      this.updateDanger=true;
      this.updateSucces=false;
    }
  }

  deleteUser(){
    this.curpService.deleteUser(this.id).subscribe({
          next: () => [console.log("Usuario eliminado"), this.deleteSucces=true, this.deleteDanger=false, this.cargarInfo(), this.userSelected = false],
          error: (e) => [console.error(e),this.deleteDanger=true, this.deleteSucces=false],
          complete: () => console.info('complete') 
      })
  }

  selectUser(user: Curp){
    this.userSelected = true;
    this.username = user.username;
    this.birthday = user.birthday;
    this.id = user.id;
  }

}
