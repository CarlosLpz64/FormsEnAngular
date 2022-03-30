import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component implements OnInit {

  //Variables
  nombre: string = "Carlos López"
  edad: number = 19;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
