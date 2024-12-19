import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface channelType {
  id: number;
  channelTypeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChannelTypeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/channel-type';

  list(): Observable<channelType[]> {
    return this.http.get<channelType[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<channelType> {
    return this.http.get<channelType>(`${this.apiUrl}/find/${id}`);
  }
}