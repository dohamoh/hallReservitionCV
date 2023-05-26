import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private baseUrl = 'https://hall-apis.vercel.app/hall';
  // private baseUrl = 'https://hall-ap-is.vercel.app/hall';

  constructor(private HttpClient: HttpClient) { }

  addHall(data:any){
    return this.HttpClient.post(`${this.baseUrl}/addHall` , data);
  }
  deleteHall(id: any): any {
    return this.HttpClient.delete(`${this.baseUrl}/deleteHall/${id}`);
  }
  editHall(data:any , id:any): any {

    return this.HttpClient.put(`${this.baseUrl}/editHall/${id}` , data);
  }
  getHalls(): any {
    return this.HttpClient.get(`${this.baseUrl}/getHalls`);
  }
}
