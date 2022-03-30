import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApisComponent } from './components/apis/apis.component';
import { HomeComponent } from './components/home/home.component';
import { IndiceComponent } from './components/indice/indice.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ActoresComponent } from './components/pages/actores/actores.component';
import { AsientosComponent } from './components/pages/asientos/asientos.component';
import { CarteleraComponent } from './components/pages/cartelera/cartelera.component';
import { CategoriasComponent } from './components/pages/categorias/categorias.component';
import { CinesComponent } from './components/pages/cines/cines.component';
import { DirectoresComponent } from './components/pages/directores/directores.component';
import { FuncionesComponent } from './components/pages/funciones/funciones.component';
import { LoadScreenComponent } from './components/pages/load-screen/load-screen.component';
import { NuevaPeliculaComponent } from './components/pages/nueva-pelicula/nueva-pelicula.component';
import { NuevoActorComponent } from './components/pages/nuevo-actor/nuevo-actor.component';
import { NuevoCategoriaComponent } from './components/pages/nuevo-categoria/nuevo-categoria.component';
import { NuevoCineComponent } from './components/pages/nuevo-cine/nuevo-cine.component';
import { NuevoDirectorComponent } from './components/pages/nuevo-director/nuevo-director.component';
import { NuevoFuncionComponent } from './components/pages/nuevo-funcion/nuevo-funcion.component';
import { NuevoProductoraComponent } from './components/pages/nuevo-productora/nuevo-productora.component';
import { NuevoSalaComponent } from './components/pages/nuevo-sala/nuevo-sala.component';
import { PeliculasComponent } from './components/pages/peliculas/peliculas.component';
import { ProductorasComponent } from './components/pages/productoras/productoras.component';
import { SalasComponent } from './components/pages/salas/salas.component';
import { TicketComponent } from './components/pages/ticket/ticket.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
//Rutas de navegación
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: HomeComponent},
  {path: 'signup', component: Pagina2Component},
  {path: 'home', component: Pagina1Component, canActivate:[AuthGuard]},
  {path: 'apis', component: ApisComponent, canActivate:[AuthGuard]},
  {path: 'indice', component: IndiceComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'actores', component: ActoresComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevoActor', component: NuevoActorComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'directores', component: DirectoresComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevoDirector', component: NuevoDirectorComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'categorias', component: CategoriasComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevaCategoria', component: NuevoCategoriaComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'productoras', component: ProductorasComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevaProductora', component: NuevoProductoraComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'peliculas', component: PeliculasComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevaPelicula', component: NuevaPeliculaComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'cines', component: CinesComponent, canActivate:[AuthGuard]},
  {path: 'nuevoCine', component: NuevoCineComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'salas', component: SalasComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevaSala', component: NuevoSalaComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'funciones', component: FuncionesComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'nuevaFuncion', component: NuevoFuncionComponent, canActivate:[AuthGuard, AdminGuard]},

  {path: 'asientos', component: AsientosComponent},

  {path: 'tickets', component: TicketComponent},

  {path: 'loading', component: LoadScreenComponent},

  {path: 'cartelera', component: CarteleraComponent, canActivate:[AuthGuard]},
  {path: '**', component: PagenotfoundComponent} // La ruta "**" indica un 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
