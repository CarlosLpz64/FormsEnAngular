import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ApisComponent } from './components/apis/apis.component';
import { FooterLayoutComponent } from './components/footer-layout/footer-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IndiceComponent } from './components/indice/indice.component';
import { CookieService } from 'ngx-cookie-service';
import { ActoresComponent } from './components/pages/actores/actores.component';
import { DirectoresComponent } from './components/pages/directores/directores.component';
import { CategoriasComponent } from './components/pages/categorias/categorias.component';
import { ProductorasComponent } from './components/pages/productoras/productoras.component';
import { PeliculasComponent } from './components/pages/peliculas/peliculas.component';
import { CinesComponent } from './components/pages/cines/cines.component';
import { SalasComponent } from './components/pages/salas/salas.component';
import { FuncionesComponent } from './components/pages/funciones/funciones.component';
import { CarteleraComponent } from './components/pages/cartelera/cartelera.component';
import { NuevaPeliculaComponent } from './components/pages/nueva-pelicula/nueva-pelicula.component';
import { NuevoCineComponent } from './components/pages/nuevo-cine/nuevo-cine.component';
import { NuevoActorComponent } from './components/pages/nuevo-actor/nuevo-actor.component';
import { NuevoDirectorComponent } from './components/pages/nuevo-director/nuevo-director.component';
import { NuevoCategoriaComponent } from './components/pages/nuevo-categoria/nuevo-categoria.component';
import { NuevoProductoraComponent } from './components/pages/nuevo-productora/nuevo-productora.component';
import { NuevoSalaComponent } from './components/pages/nuevo-sala/nuevo-sala.component';
import { NuevoFuncionComponent } from './components/pages/nuevo-funcion/nuevo-funcion.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AsientosComponent } from './components/pages/asientos/asientos.component';
import { LoadScreenComponent } from './components/pages/load-screen/load-screen.component';
import { TicketComponent } from './components/pages/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Pagina1Component,
    Pagina2Component,
    NavmenuComponent,
    PagenotfoundComponent,
    ApisComponent,
    FooterLayoutComponent,
    IndiceComponent,
    ActoresComponent,
    DirectoresComponent,
    CategoriasComponent,
    ProductorasComponent,
    PeliculasComponent,
    CinesComponent,
    SalasComponent,
    FuncionesComponent,
    CarteleraComponent,
    NuevaPeliculaComponent,
    NuevoCineComponent,
    NuevoActorComponent,
    NuevoDirectorComponent,
    NuevoCategoriaComponent,
    NuevoProductoraComponent,
    NuevoSalaComponent,
    NuevoFuncionComponent,
    AsientosComponent,
    LoadScreenComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, //Nesesario para forms
    FormsModule, //Necesario para ngModel
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
