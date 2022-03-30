import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurpService } from './services/curp.service';
import { GlobalesService } from './services/globales.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public variablesGlobales: GlobalesService,
    public curpService: CurpService
  ){}

  ngOnInit(): void {
    
  }

}
