import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface holder {
  id: number;
  contactname: string;
  holdaremail: string;
  holdarphonenumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class holderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/holder';

  list(): Observable<holder[]> {
    return this.http.get<holder[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<holder> {
    return this.http.get<holder>(`${this.apiUrl}/find/${id}`);
  }

  save(holder: holder): Observable<holder> {
    return this.http.post<holder>(`${this.apiUrl}/save`, holder);
  }

  update(id: number, holder: holder): Observable<holder> {
    return this.http.put<holder>(`${this.apiUrl}/update/${id}`, holder);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}