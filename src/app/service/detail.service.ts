import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { productChannelDetail } from './productchanneldetail.service';
import { activePrincipleDetail } from './activeprincipledetail.service';
import { product } from './product.service';

export interface detail {
  id: number;
  filed: number;
  auto: number;
  processType: string;
  filedDate: Date;
  autoDate: Date;
  autoContDate: Date;
  currentStatusRS: string;
  institutionalChannelFK: productChannelDetail;
  comertialChannelFK: productChannelDetail;
  activePrincipleDetailFK: activePrincipleDetail;
  productFK: product;
}

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/detail';

  list(): Observable<detail[]> {
    return this.http.get<detail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<detail> {
    return this.http.get<detail>(`${this.apiUrl}/find/${id}`);
  }
}