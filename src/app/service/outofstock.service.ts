import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

export interface Outofstock {
  id: number;
  product: string;
  summary: string;
  atc: string;
  record: string;
  atcdescription: string;
  generalsummary: string;
  therapeuticgroup: string;
  activeprinciple: string;
  pharmaceuticalform: string;
  registrationstatus: string;
  holder: string;
  concentration: string;
  datereport: Date;
  contactabast: string;
  rsstatus: string;
  channel: string;
  yearone: number;
  yeartwo: number;
  capmax: number;
  currentstatus: string;
  valueone: number;
  valuetwo: number;
  valuethree: number;
  valuefour: number;
  reasonsnottrade: string;
}

@Injectable({
  providedIn: 'root'
})
export class OutofstockService {
  private http = inject(HttpClient);
  private apiUrl = 'http://172.17.1.15:8087/api/outofstock';

  
  list(): Observable<Outofstock[]> {
    return this.http.get<Outofstock[]>(`${this.apiUrl}/find`).pipe(
      catchError(error => {
        console.error('Error fetching out-of-stock items:', error);
        return []; // Devuelve un array vacío en caso de error
      })
    );
  }

  get(id: number): Observable<Outofstock> {
    return this.http.get<Outofstock>(`${this.apiUrl}/find/${id}`);
  }

  save(outofstock: Outofstock): Observable<Outofstock> {
    return this.http.post<Outofstock>(`${this.apiUrl}/save`, outofstock);
  }

  update(id: number, outofstock: Outofstock): Observable<Outofstock> {
    return this.http.put<Outofstock>(`${this.apiUrl}/update/${id}`, outofstock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
