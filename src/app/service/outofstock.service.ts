import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

export interface Outofstock {
  id: number;
  product: string;
  resofinv: string;
  atc: string;
  record: string;
  atcdescription: string;
  generalsummary: string;
  therapeuticgroup: string;
  activeprinciple: string;
  pharmaceuticalform: string;
  abaststatus: string;
  holder: string;
  concentration: string;
  datereport: Date;
  rsstatus: string;
  causes: string;
  dateofstart: Date;
  dateend: Date;
  dateclosing: Date;

  // Canal comercial
  commercialchannel: string;
  commercialyearone: number;
  commercialyeartwo: number;
  commercialcapmax: number;
  commercialvalueone: number;
  commercialvaluetwo: number;
  commercialvaluethree: number;
  commercialvaluefour: number;
  commercialcurrentstatus: string;
  commercialreasonsnottrade: string;
  commercialobsnotcommerce: string;

  // Canal institucional
  institutionalchannel: string;
  institutionalyearone: number;
  institutionalyeartwo: number;
  institutionalcapmax: number;
  institutionalvalueone: number;
  institutionalvaluetwo: number;
  institutionalvaluethree: number;
  institutionalvaluefour: number;
  institutionalcurrentstatus: string;
  institutionalreasonsnottrade: string;
  institutionalobsnotcommerce: string;
}

@Injectable({
  providedIn: 'root'
})
export class OutofstockService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/outofstock';

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

  findAllActivePrinciples(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/activeprinciple`);
  }

  findAllAtc(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/atc`);
  }

  findAllAbastStatus(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/abaststatus`);
  }

  downloadExcel(activePrinciples?: string, atc?: string, abastStatus?: string): Observable<Blob> {
    const params: { [key: string]: string } = {};
    
    if (activePrinciples) {
      params['activeprinciples'] = activePrinciples; 
    }
    
    if (atc) {
      params['atc'] = atc; 
    }
    
    if (abastStatus) {
      params['abaststatus'] = abastStatus; 
    }
  
    return this.http.get(`${this.apiUrl}/download-excel`, { params, responseType: 'arraybuffer' }).pipe(
      map((data: ArrayBuffer) => new Blob([data])),
      catchError(error => {
        throw error;
      })
    );
  }  
}