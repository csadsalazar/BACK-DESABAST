import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface reportDetail {
  id: number;
  filed: Number;
  auto: Number;
  processtype: string;
  fileddate: Date;
  autodate: Date;
  autocontdate: Date;
  resantinv: string;
}

@Injectable({
  providedIn: 'root'
})
export class reportDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/report-detail';

  list(): Observable<reportDetail[]> {
    return this.http.get<reportDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<reportDetail> {
    return this.http.get<reportDetail>(`${this.apiUrl}/find/${id}`);
  }

  save(reportdetail: reportDetail): Observable<reportDetail> {
    return this.http.post<reportDetail>(`${this.apiUrl}/save`, reportdetail);
  }

  update(id: number, reportdetail: reportDetail): Observable<reportDetail> {
    return this.http.put<reportDetail>(`${this.apiUrl}/update/${id}`, reportdetail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}