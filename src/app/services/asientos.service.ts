import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalesService } from './globales.service';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  baseURL = environment.usersCRUD;
  miNamespace: string = "asientos";

  constructor(
    private http: HttpClient, 
    private cookie: CookieService,
    public variablesGlobales: GlobalesService) { }

  store(data: any): Observable<any>{
    const url = this.baseURL + '/api/v1/CambiarDisponibilidad';
    return this.http.post<any>(url, data);
  }

  update(data: any, id: number): Observable<any>{
    const url = this.baseURL + '/' + this.miNamespace + '/update/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.patch<any>(url, data, {headers});
  }

  deleteUser(id: number): Observable<any>{
    const url = this.baseURL + '/' + this.miNamespace + '/delete/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.delete<any>(url, {headers});
  }

  index(): Observable<any>{
    const url = this.baseURL + '/api/v1/AsientosxFuncion/' + this.variablesGlobales.idFuncion;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }
}
