import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface pharmaceuticalForm {
  id: number;
  pharmaceuticalFormName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PharmaceuticalFormService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pharmaceutical-form';

  list(): Observable<pharmaceuticalForm[]> {
    return this.http.get<pharmaceuticalForm[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<pharmaceuticalForm> {
    return this.http.get<pharmaceuticalForm>(`${this.apiUrl}/find/${id}`);
  }

  save(pharmaceuticalform: pharmaceuticalForm): Observable<pharmaceuticalForm> {
    return this.http.post<pharmaceuticalForm>(`${this.apiUrl}/save`, pharmaceuticalform);
  }

  update(id: number, pharmaceuticalform: pharmaceuticalForm): Observable<pharmaceuticalForm> {
    return this.http.put<pharmaceuticalForm>(`${this.apiUrl}/update/${id}`, pharmaceuticalform);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}