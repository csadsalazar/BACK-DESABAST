import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { productChannelDetail } from './productchanneldetail.service';
import { activePrincipleDetail } from './activeprincipledetail.service';
import { product } from './product.service';

export interface productDetail {
  id: number;
  filed: number;
  auto: number;
  processType: string;
  filedDate: Date;
  autoDate: Date;
  autoContDate: Date;
  institutionalChannelFK: productChannelDetail[];
  comertialChannelFK: productChannelDetail[];
  activePrincipleDetailFK: activePrincipleDetail[];
  producFK: product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/detail';

  list(): Observable<productDetail[]> {
    return this.http.get<productDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<productDetail> {
    return this.http.get<productDetail>(`${this.apiUrl}/find/${id}`);
  }
}