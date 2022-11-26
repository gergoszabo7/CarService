import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  postCar(data: any){
    return this.http.post<any>("http://localhost:3000/Cars/",data);
  }

  getCar(){
    return this.http.get<any>("http://localhost:3000/Cars/");
  }

  postMaint(data: any){
    return this.http.post<any>("http://localhost:3000/Maintainances/",data);
  }

  getMaint(){
    return this.http.get<any>("http://localhost:3000/Maintainances/");
  }
}
