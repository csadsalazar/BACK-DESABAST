import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface product {
  id: number;
  record: string;
  holderemail: string;
  concentration: string;
  registerstatus: string;
  institutionalchannelfk: string;
  comertialchannelfK: string;
  activeprinciplefk: string;
  terapeuticgroupfk: string;
  pharmaceuticalformfk: string;
  holderfk: string;
}

@Injectable({
  providedIn: 'root'
})
export class productService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/product';

  list(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/find/${id}`);
  }

  save(product: product): Observable<product> {
    return this.http.post<product>(`${this.apiUrl}/save`, product);
  }

  update(id: number, product: product): Observable<product> {
    return this.http.put<product>(`${this.apiUrl}/update/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}