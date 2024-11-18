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

  save(cause: cause): Observable<cause> {
    return this.http.post<cause>(`${this.apiUrl}/save`, cause);
  }

  update(id: number, cause: cause): Observable<cause> {
    return this.http.put<cause>(`${this.apiUrl}/update/${id}`, cause);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}