import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Asiento } from 'src/app/models/asiento';
import { AsientosService } from 'src/app/services/asientos.service';
import { GlobalesService } from 'src/app/services/globales.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  miInterval: any;

  total = 0;
  precio: number = 90;
  oportunidad: boolean = false;


  Asientos:Asiento[] = [];
  
  Seleccionados: string[] = [];

  SeleccionadosEstado: boolean[] = [];

  constructor(private router: Router, 
    private miService:AsientosService, 
    public variablesGlobales: GlobalesService,
    private ticketService:TicketsService,
    private cookie: CookieService
    ) { }


  DeseleccionarTodo(){
    this.SeleccionadosEstado = [
      false, false, false, false, 
      false, false, false, false, 
      false, false, false, false, 
      false, false, false, false, 
      false, false, false, false
    ];
  }

  ngOnInit(): void {
    console.log("Función: " + this.variablesGlobales.idFuncion)
    this.DeseleccionarTodo();
    this.cargarAsientos();
    this.miInterval = setInterval(() => {
      this.cargarAsientos()
      this.perderAsiento()
    }, 500);
  }

  ngOnDestroy() {
    if (this.miInterval) {
      clearInterval(this.miInterval);
    }
  }

  asignarSeleccionados(){
    for(let i in this.Asientos){
      this.Asientos[i].seleccionado = this.SeleccionadosEstado[i]
    }
  }

  cargarAsientos(){
    console.log("Actualizando asientos")
    this.miService.index().subscribe({
      next: (r) => [
      console.log(r),
      this.Asientos = r.data,
      this.asignarSeleccionados()
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
  }

  comprarAsientos(){
    console.log("Comprando...")
    const miRequest = {
      'id': this.Seleccionados
    }
    console.log(miRequest);
    this.miService.store(miRequest).subscribe({
        next: () => [console.log("Asientos comprados"), 
        this.ocuparComprados(),
        //this.reiniciar(), //comentar 
        this.generarTicket()],
        error: (e) => [console.error(e)],
        complete: () => console.info('complete') 
      })
  }

  reiniciar(){
    this.Seleccionados = [],
    //this.total = 0, 
    this.DeseleccionarTodo(),
    alert("Asientos comprados correctamente")
  }

  cadenaAsientos(){
    var aux = ""
    this.Seleccionados.forEach(ids => {
      this.Asientos.forEach(asiento => {
        if (ids == asiento._id){
          aux = aux + " " + asiento.nombre
        }
      });
    });
    return aux;
  }

  generarTicket(){
    console.log("Comprando...")
    const miRequest = {
      'asientos': this.cadenaAsientos(),
      'total': this.total,
      'usuario': Number(this.cookie.get("ID")),
      'funcion': this.variablesGlobales.idFuncion
    }
    console.log(miRequest);
    this.ticketService.store(miRequest).subscribe({
        next: () => [
          console.log("Ticket generado"),
          this.reiniciar()
        ],
        error: (e) => [console.error(e)],
        complete: () => console.info('complete') 
      })
  }

  ocuparComprados(){
    this.Asientos.forEach(asiento => {
      this.Seleccionados.forEach(ids => {
        if (asiento._id == ids){
          asiento.estado = true;
          asiento.seleccionado = false;
        }
      });
    });
  }

  regresar(){
    this.router.navigate(['/cartelera']);
  }

  cambiarModo(asiento: Asiento, index: number){

    if (asiento.seleccionado){
      asiento.seleccionado = false;
      this.SeleccionadosEstado[index] = false;
      this.total -= this.precio;
      console.log(asiento._id)
      this.Seleccionados = this.Seleccionados.filter(item => item !== asiento._id);
    } else{
      if (!asiento.estado){
        asiento.seleccionado = true;
        this.SeleccionadosEstado[index] = true;
        this.total += this.precio;
        this.Seleccionados.push(asiento._id)
      }
    }    
  }

  perderAsiento(){
    for(let i in this.Asientos){
      if (this.Asientos[i].estado && this.Asientos[i].seleccionado){
        this.Asientos[i].seleccionado = false;
        this.SeleccionadosEstado[i] = false;
        this.total -= this.precio;
        this.oportunidad = true;
        this.Seleccionados = this.Seleccionados.filter(item => item !== this.Asientos[i]._id);
      }
    };
  }

}


