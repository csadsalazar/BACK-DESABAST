import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutofstockService {
  private http = inject(HttpClient);

  list() {
    return this.http.get('http://localhost:8080/api/outofstock/find');
  }

  get(id: number) {
    return this.http.get(`http://localhost:8080/api/outofstock/find/${id}`);
  }

  save(outofstock: any) {
    return this.http.post('http://localhost:8080/api/outofstock/save', outofstock);
  }

  update(id: number, outofstock: any) {
    return this.http.put(`http://localhost:8080/api/outofstock/update/${id}`, outofstock);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/api/outofstock/delete/${id}`);
  }
}
