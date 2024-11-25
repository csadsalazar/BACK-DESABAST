import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { productChannelDetail } from './productchanneldetail.service';
import { activePrinciple } from './activeprinciple.service';
import { therapeuticGroup } from './therapeuticgroup.service';
import { holder } from './holder.service';

export interface product {
  id: number;
  record: string;
  productName: string;
  registerStatus: string;
  institutionalChannelFK: productChannelDetail;
  comertialChannelFK: productChannelDetail;
  activePrincipleFK: activePrinciple;
  terapeuticGroupFK: therapeuticGroup;
  holderFK: holder;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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