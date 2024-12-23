import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { activePrinciple } from './activeprinciple.service';
import { abastStatus } from './abaststatus.service';
import { cause } from './cause.service';

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
  insertDate: Date;
  summary: string;
  activePrincipleFK: activePrinciple;
  abastStatusFK: abastStatus;
  causeFK: cause;
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
}