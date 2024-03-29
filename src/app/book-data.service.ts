import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private URL = 'http://localhost:3000/api/books';

  constructor(private _http: HttpClient) { }

  //1.post data on server.
  PostData(data: any): Observable<any> {
    return this._http.post(this.URL, data)
  }

  //2.fetch datas from server.
  getData(): Observable<any> {
    return this._http.get(this.URL)
  }

  //3.fetch one data/record from server for update.
  getDataById(id: number): Observable<any> {
    return this._http.get(`${this.URL}/${id}`);
  }
  updateData(id: number, updatedData: any): Observable<any> {
    return this._http.put(`${this.URL}/${id}`, updatedData);
  }

  private newSubject = new BehaviorSubject('');
  shareData = this.newSubject.asObservable();
  sendData(item: any) {
    this.newSubject.next(item);
  }

  //4.delete one record/data from server
  deleteData(id: number): Observable<any> {
    return this._http.delete(`${this.URL}/${id}`);
  }

}
