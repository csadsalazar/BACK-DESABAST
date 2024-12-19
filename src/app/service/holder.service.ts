import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface holder {
  id: number;
  contactName: string;
  holdarEmail: string;
  holdarPhoneNumber: Number;
}

@Injectable({
  providedIn: 'root'
})
export class HolderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/holder';

  list(): Observable<holder[]> {
    return this.http.get<holder[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<holder> {
    return this.http.get<holder>(`${this.apiUrl}/find/${id}`);
  }
}