import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { activePrinciple } from './activeprinciple.service';
import { therapeuticGroup } from './therapeuticgroup.service';
import { holder } from './holder.service';

export interface product {
  id: number;
  record: number;
  productName: string;
  therapeuticGroupFK: therapeuticGroup;
  holderFK: holder;
  activePrincipleFK: activePrinciple;  
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/product';

  // Métodos existentes
  list(): Observable<product[]> {
    return this.http.get<product[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<product> {
    return this.http.get<product>(`${this.apiUrl}/find/${id}`);
  }
}