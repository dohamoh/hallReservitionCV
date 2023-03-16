import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:3000/reservation';

  constructor(private HttpClient:HttpClient) { }

  addReservation(data: any): any {
      return this.HttpClient.post(`${this.baseUrl}/addReservation`, data);
    }
}
