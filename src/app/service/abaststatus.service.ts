import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface abastStatus {
  id: number;
  statusabastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class abastStatusService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/abast-status';

  list(): Observable<abastStatus[]> {
    return this.http.get<abastStatus[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<abastStatus> {
    return this.http.get<abastStatus>(`${this.apiUrl}/find/${id}`);
  }

  save(abaststatus: abastStatus): Observable<abastStatus> {
    return this.http.post<abastStatus>(`${this.apiUrl}/save`, abaststatus);
  }

  update(id: number, abaststatus: abastStatus): Observable<abastStatus> {
    return this.http.put<abastStatus>(`${this.apiUrl}/update/${id}`, abaststatus);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}