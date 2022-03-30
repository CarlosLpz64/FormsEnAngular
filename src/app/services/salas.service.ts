import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  baseURL = environment.usersCRUD;
  miNamespace: string = "/api/v1/salas";

  constructor(private http: HttpClient, private cookie: CookieService) { }

  store(data: any): Observable<any>{
    const url = this.baseURL +  this.miNamespace;
    return this.http.post<any>(url, data);
  }

  update(data: any, id: number): Observable<any>{
    const url = this.baseURL +  this.miNamespace + '/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.put<any>(url, data, {headers});
  }

  deleteUser(id: number): Observable<any>{
    const url = this.baseURL +  this.miNamespace + '/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.delete<any>(url, {headers});
  }

  index(): Observable<any>{
    const url = this.baseURL + this.miNamespace;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }
}
