import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { channelType } from './channeltype.service';
import { activePrincipleDetail } from './activeprincipledetail.service';
import { product } from './product.service';

export interface productChannelDetail {
  id: number;
  maxCapacity: number;
  registerDate: Date;
  oneMonth: string;
  commercialValueOne: number;
  twoMonth: string;
  commercialValueTwo: number;
  threeMonth: string;
  commercialValueThree: number;
  fourMonth: string;
  commercialValueFour: number;
  observationsNoCommercial: string;
  reasonsNoCommercial: string;
  oneYear: number;
  saleOne: number;
  twoYear: number;
  saleTwo: number;
  currentStatus: string;
  productFK: product;
  channelTypeFK: channelType;
}

@Injectable({
  providedIn: 'root'
})
export class ProductChannelDetailService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/product-channel-detail';

  list(): Observable<activePrincipleDetail[]> {
    return this.http.get<activePrincipleDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<activePrincipleDetail> {
    return this.http.get<activePrincipleDetail>(`${this.apiUrl}/find/${id}`);
  }
}