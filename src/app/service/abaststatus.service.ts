import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface abastStatus {
  id: number;
  statusAbastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbastStatusService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/abast-status';

  list(): Observable<abastStatus[]> {
    return this.http.get<abastStatus[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<abastStatus> {
    return this.http.get<abastStatus>(`${this.apiUrl}/find/${id}`);
  }
}