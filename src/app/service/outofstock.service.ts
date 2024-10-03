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
  private apiUrl = 'http://localhost:8080/api/outofstock';

  
  list(): Observable<Outofstock[]> {
    return this.http.get<Outofstock[]>(`${this.apiUrl}/find`);
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

    // Método para descargar el archivo Excel
    downloadExcel(): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/out-of-stock`, { responseType: 'blob' }).pipe(
        catchError(error => {
          console.error('Error downloading the Excel file', error);
          throw error; // Lanzar el error para manejarlo en el componente
        })
      );
    }
}