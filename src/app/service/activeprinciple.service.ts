import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { abastStatus } from './abaststatus.service';
import { cause } from './cause.service';
import { technicalDetail } from './technicaldetail.service';
import { product } from './product.service';
import { pharmaceuticalForm } from './pharmaceuticalform.service';

export interface activePrinciple {
  id: number;
  activePrincipleName: string;
  actCode: string;
  actDescription: string;
  concentration: string;
  initialFollowUp: Date;
  finalFollowUp: Date;
  finishDate: Date;
  summary: string;
  abastStatusFK: abastStatus;
  causeFK: cause;
  technicalDetailFK: technicalDetail;
  pharmaceuticalFormFK: pharmaceuticalForm;
  productList: product[];  // Aquí debe ser un array de productos
}


@Injectable({
  providedIn: 'root'
})
export class ActivePrincipleService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/active-principle';

  list(): Observable<activePrinciple[]> {
    return this.http.get<activePrinciple[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<activePrinciple> {
    return this.http.get<activePrinciple>(`${this.apiUrl}/find/${id}`);
  }

  getNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/names`);
  }

  getAtcCodes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/atc-codes`);
  }

  save(principle: activePrinciple): Observable<activePrinciple> {
    return this.http.post<activePrinciple>(`${this.apiUrl}/save`, principle);
  }

  update(id: number, principle: activePrinciple): Observable<activePrinciple> {
    return this.http.put<activePrinciple>(`${this.apiUrl}/update/${id}`, principle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}