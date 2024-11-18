import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

export interface therapeuticGroup {
  id: number;
  therapeuticGroupName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TherapeuticGroupService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/therapeutic-group';

  list(): Observable<therapeuticGroup[]> {
    return this.http.get<therapeuticGroup[]>(`${this.apiUrl}/find`);
  }

  get(id: number): Observable<therapeuticGroup> {
    return this.http.get<therapeuticGroup>(`${this.apiUrl}/find/${id}`);
  }

  save(therapeuticgroup: therapeuticGroup): Observable<therapeuticGroup> {
    return this.http.post<therapeuticGroup>(`${this.apiUrl}/save`, therapeuticgroup);
  }

  update(id: number, therapeuticgroup: therapeuticGroup): Observable<therapeuticGroup> {
    return this.http.put<therapeuticGroup>(`${this.apiUrl}/update/${id}`, therapeuticgroup);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}