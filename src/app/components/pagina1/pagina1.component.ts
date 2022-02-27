import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit {

  //Variables
  //Act 1 - ngModel
  nombre: string = "Carlos López"
  edad: number = 19;
  //Act 2 - ngFor
  users: string[] = ['Carlos','Brenda','América'];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar(){
    this.router.navigate(['/pagina2']);
  }

  deleteUser(user: string){
    for (let i=0; i < this.users.length; i++){
      if (user == this.users[i]){
        this.users.splice(i,1);
      }
    }
  }

  addUser(newUser: any){
    this.users.push(newUser.value) //Agrega valor a la lista
    newUser.value = ""; //limpia el input
    newUser.focus();
    return false; //Evita que se refresca la página
  }

}
