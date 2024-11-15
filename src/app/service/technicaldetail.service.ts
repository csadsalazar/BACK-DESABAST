import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface technicalDetail {
  id: number;
  reporter: string;
  alerttype: string;
  reportdate: Date;
  review: string;
  headlinesnum: Number;
  rscurrent: Number;
  rsprocedure: Number;
}

@Injectable({
  providedIn: 'root'
})
export class technicalDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/technical-detail';

  list(): Observable<technicalDetail[]> {
    return this.http.get<technicalDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<technicalDetail> {
    return this.http.get<technicalDetail>(`${this.apiUrl}/find/${id}`);
  }

  save(technicaldetail: technicalDetail): Observable<technicalDetail> {
    return this.http.post<technicalDetail>(`${this.apiUrl}/save`, technicaldetail);
  }

  update(id: number, technicaldetail: technicalDetail): Observable<technicalDetail> {
    return this.http.put<technicalDetail>(`${this.apiUrl}/update/${id}`, technicaldetail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}