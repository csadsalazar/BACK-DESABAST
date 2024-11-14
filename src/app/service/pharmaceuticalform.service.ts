import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface pharmaceuticalForm {
  id: number;
  pharmaceuticalformname: string;
}

@Injectable({
  providedIn: 'root'
})
export class pharmaceuticalFormService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/abast-status';

  list(): Observable<pharmaceuticalForm[]> {
    return this.http.get<pharmaceuticalForm[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<pharmaceuticalForm> {
    return this.http.get<pharmaceuticalForm>(`${this.apiUrl}/find/${id}`);
  }

  save(holder: pharmaceuticalForm): Observable<pharmaceuticalForm> {
    return this.http.post<pharmaceuticalForm>(`${this.apiUrl}/save`, holder);
  }

  update(id: number, holder: pharmaceuticalForm): Observable<pharmaceuticalForm> {
    return this.http.put<pharmaceuticalForm>(`${this.apiUrl}/update/${id}`, holder);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}