import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface activePrinciple {
  id: number;
  activeprinciplename: string;
  actcode: string;
  actdescription: string;
  initialfollowup: Date;
  finalfollowup: Date;
  finishdate: Date;
  summary: string;
  abaststatusfK: Number;
  causefK: Number;
  technicaldetailfK: Number;
}

@Injectable({
  providedIn: 'root'
})
export class activePrincipleService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/abast-status';

  list(): Observable<activePrinciple[]> {
    return this.http.get<activePrinciple[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<activePrinciple> {
    return this.http.get<activePrinciple>(`${this.apiUrl}/find/${id}`);
  }

  save(activeprinciple: activePrinciple): Observable<activePrinciple> {
    return this.http.post<activePrinciple>(`${this.apiUrl}/save`, activeprinciple);
  }

  update(id: number, activeprinciple: activePrinciple): Observable<activePrinciple> {
    return this.http.put<activePrinciple>(`${this.apiUrl}/update/${id}`, activeprinciple);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}