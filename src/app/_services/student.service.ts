import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  // 1. get list method
  getList(pageIndex: number, classId: string) {
    return this.http.get(`${environment.apiUrl}/api/students?page=${pageIndex}&classId=${classId}`);
  }

  // 2. create method
  create(data = {}) {
    return this.http.post(`${environment.apiUrl}/api/students/add`, data);
  }

  // 3. update method
  update(id: string, data = {}) {
    return this.http.put(`${environment.apiUrl}/api/students/${id}/update`, data);
  }

  // 4. delete method
  delete(id: string) {
    // let options = {body: data};
    return this.http.delete(`${environment.apiUrl}/api/students/${id}/delete`);
  }

  // 5. get list class
  getListClasses() {
    return this.http.get(`${environment.apiUrl}/api/classes`);
  }
}
