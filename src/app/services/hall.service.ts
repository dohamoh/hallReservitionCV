import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private baseUrl = 'http://localhost:3000/hall';

  constructor(private HttpClient:HttpClient) { }
  deleteHall(id: any): any {
    return this.HttpClient.delete(`${this.baseUrl}/deleteHall/${id}`);
  }
}
