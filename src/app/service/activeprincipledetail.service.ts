import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { activePrinciple } from './activeprinciple.service';
import { abastStatus } from './abaststatus.service';
import { cause } from './cause.service';
import { detail } from './detail.service';

export interface activePrincipleDetail {
  id: number;
  alertType: string;
  headlinesNum: number;
  reportDate: Date;
  reporter: string;
  review: string;
  rsCurrent: number;
  rsProcedure: number;
  initialFollowUp: Date;
  finalFollowUp: Date;
  finishDate: Date;
  insertMonth: string;
  insertYear: number;
  summary: string;
  activePrincipleFK: activePrinciple;
  abastStatusFK: abastStatus;
  causeFK: cause;
  details: detail[];
}

@Injectable({
  providedIn: 'root'
})
export class ActivePrincipleDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/active-principle-detail';

  list(): Observable<activePrincipleDetail[]> {
    return this.http.get<activePrincipleDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<activePrincipleDetail> {
    return this.http.get<activePrincipleDetail>(`${this.apiUrl}/find/${id}`);
  } 

  // Método para obtener los meses distintos
  getDistinctMonths(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/months`);
  }
  
  // Método para obtener los años distintos
  getDistinctYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/years`);
  }

  // Método para descargar el archivo Excel
  downloadExcel(params: any): Observable<ArrayBuffer> {
    return this.http.get(`${this.apiUrl}/download-excel`, { 
      params: params, 
      responseType: 'arraybuffer' 
    });
  }
}