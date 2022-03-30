import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  baseURL = environment.usersCRUD;

  constructor(private http: HttpClient) { }

  store(data: any): Observable<any>{
    const url = this.baseURL +  '/api/v1/InsertarTicket';
    return this.http.post<any>(url, data);
  }

  index(): Observable<any>{
    const url = this.baseURL + '/tickets';
    return this.http.get<any>(url);
  }
}
