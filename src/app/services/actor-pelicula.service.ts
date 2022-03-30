import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorPeliculaService {

  baseURL = environment.usersCRUD;
  miNamespace: string = "actorPelicula";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  store(data: any): Observable<any>{
    const url = this.baseURL + '/' + this.miNamespace + '/create';
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
    const url = this.baseURL + '/' + this.miNamespace + '/index';
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }
}
