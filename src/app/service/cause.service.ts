import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface cause {
  id: number;
  causeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CauseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/cause';

  list(): Observable<cause[]> {
    return this.http.get<cause[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<cause> {
    return this.http.get<cause>(`${this.apiUrl}/find/${id}`);
  }
}