import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface channelType {
  id: number;
  name: string;
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

  save(channeltype: channelType): Observable<channelType> {
    return this.http.post<channelType>(`${this.apiUrl}/save`, channeltype);
  }

  update(id: number, channeltype: channelType): Observable<channelType> {
    return this.http.put<channelType>(`${this.apiUrl}/update/${id}`, channeltype);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}