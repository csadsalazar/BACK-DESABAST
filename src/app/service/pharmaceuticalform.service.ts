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

  getDistinctForms(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/forms`);
  }
}