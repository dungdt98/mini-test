import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  // 1. get list method
  getList(keyword: string, pageIndex: number, pageSize: number) {
    return this.http.get(`${environment.apiUrl}/index?Keyword=${keyword}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
  }

  // 2. create method
  create(data = {}) {
    return this.http.post(`${environment.apiUrl}/store`, data);
  }

  // 3. update method
  updateDemo(data = {}) {
    return this.http.patch(`${environment.apiUrl}/update`, data);
  }

  // 4. delete method
  deleteDemo(data = {}) {
    let options = {body: data};
    return this.http.delete(`${environment.apiUrl}/delete`, options);
  }
}
