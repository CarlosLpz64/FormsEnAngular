import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurpService } from 'src/app/services/curp.service';
import { GlobalesService } from 'src/app/services/globales.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  isLogged:boolean = false;
  nombreCine:string = this.variablesGlobales.getMiCine();

  constructor(
    private curpService:CurpService,
    public variablesGlobales: GlobalesService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.variablesGlobales.getIsLooged();
  }

  logout(){
    this.curpService.isLoading = true;
    console.log("Cerrando sesión...");
    this.curpService.logout().subscribe({
      next: (r) => [
        console.log("Sesión cerrada"),
        this.cookie.set("Token", ""),
        this.variablesGlobales.setIsLogged(false)
        ],
      error: (e) => [console.error(e), this.curpService.isLoading = false],
      complete: () => [console.info('complete'), this.curpService.isLoading = false ]
    })
    this.router.navigate(['/login']);
  }

}
