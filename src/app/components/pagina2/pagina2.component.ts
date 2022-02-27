import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  miFormulario = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.minLength(3)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    userpassword : new FormControl('', [Validators.required, Validators.minLength(10)]),
    curp : new FormControl('', [Validators.required]),
    edad : new FormControl('', [Validators.required, Validators.minLength(1)])
  });

}
