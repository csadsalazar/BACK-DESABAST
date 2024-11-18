import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';
import { channelType } from './channeltype.service';

export interface productChannelDetail {
  id: number;
  maxCapacity: Number;
  registerDate: Date;
  oneMonth: string;
  commercialValueOne: Number;
  twoMonth: string;
  commercialValueTwo: Number;
  threeMonth: string;
  commercialValueThree: Number;
  fourMonth: string;
  commercialValueFour: Number;
  observationsNoCommercial: string;
  reasonsNoCommercial: string;
  oneYear: string;
  saleOne: Number;
  twoYear: string;
  saleTwo: Number;
  currentStatus: string;
  channelTypeFK: channelType;
}

@Injectable({
  providedIn: 'root'
})
export class ProductChannelDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/product-channel-detail';

  list(): Observable<productChannelDetail[]> {
    return this.http.get<productChannelDetail[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<productChannelDetail> {
    return this.http.get<productChannelDetail>(`${this.apiUrl}/find/${id}`);
  }

  save(productchanneldetail: productChannelDetail): Observable<productChannelDetail> {
    return this.http.post<productChannelDetail>(`${this.apiUrl}/save`, productchanneldetail);
  }

  update(id: number, productchanneldetail: productChannelDetail): Observable<productChannelDetail> {
    return this.http.put<productChannelDetail>(`${this.apiUrl}/update/${id}`, productchanneldetail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}