import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthAdmin } from '../models/auth-admin';
import { Curp } from '../models/curp';
import { UserAuth } from '../models/user-auth';

@Injectable({
  providedIn: 'root'
})
export class CurpService {
  baseURL = environment.usersCRUD;
  respuesta: boolean = false;
  miAuth!: UserAuth;
  error: string = "";
  isLoading = false;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  store(userCurp: any): Observable<any>{
    const url = this.baseURL + '/signup';
    return this.http.post<any>(url, userCurp);
  }

  update(userCurp: any, id: number): Observable<any>{
    const url = this.baseURL + '/users/updateUser/' + id;
    console.log(url)
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.patch<any>(url, userCurp, {headers});
  }

  deleteUser(id: number): Observable<any>{
    const url = this.baseURL + '/users/deleteUser/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.delete<any>(url, {headers});
  }

  index(): Observable<any>{
    const url = this.baseURL + '/users/index';
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.get<any>(url, {headers});
  }

  login(data: any): Observable<any>{
    const url = this.baseURL + '/login';
    return this.http.post<any>(url, data);
  }

  logout(): Observable<any>{
    const url = this.baseURL + '/logout';
    const body = { title: '' };
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    return this.http.post<any>(url, body, {headers});
  }
  
  
  verificarToken():Observable<UserAuth>{
    const url = this.baseURL + '/verificarToken';
    const body = { title: '' };
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    const respuesta = this.http.post<UserAuth>(url, body, {headers});
    return respuesta;
  }

  verificarAdmin(id:string):Observable<AuthAdmin>{
    console.log("Mi tokne:" + this.cookie.get("Token"));
    console.log("Mi id:" + id);
    const url = this.baseURL + '/api/checarpermiso/' + id;
    const headers = { 'Authorization': ('Bearer ' + this.cookie.get("Token"))};
    const respuesta = this.http.get<AuthAdmin>(url, {headers});
    return respuesta;
  }
  

}
