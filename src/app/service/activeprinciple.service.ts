import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { pharmaceuticalForm } from './pharmaceuticalform.service';
import { activePrincipleDetail } from './activeprincipledetail.service';

export interface activePrinciple {
  id: number;
  activePrincipleName: string;
  actCode: string;
  actDescription: string;
  concentration: string;
  pharmaceuticalFormFK: pharmaceuticalForm;
  activePrincipleDetailList: activePrincipleDetail[];
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
}