import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface productChannelDetail {
  id: number;
  maxcapacity: Number;
  registerdate: Date;
  onemonth: string;
  commercialvalueone: Number;
  twomonth: string;
  commercialvaluetwo: Number;
  threemonth: string;
  commercialvaluethree: Number;
  fourmonth: string;
  commercialvaluefour: Number;
  observationsnocommercial: string;
  reasonsnocommercial: string;
  oneyear: string;
  saleone: Number;
  twoyear: string;
  saletwo: Number;
  currentstatus: string;
  channeltypefk: Number;
}

@Injectable({
  providedIn: 'root'
})
export class productChannelDetailService {
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