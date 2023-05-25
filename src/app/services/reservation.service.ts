import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = 'https://halls-apis.vercel.app/reservation';
  // private baseUrl = 'http://localhost:3000/reservation';

  constructor(private HttpClient: HttpClient) {}

  addReservation(data: any): any {
    return this.HttpClient.post(`${this.baseUrl}/addReservation`, data, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  getAllReservation(): any {
    return this.HttpClient.get(`${this.baseUrl}/getAllReservation`, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  OnHoldReservation(id: Object): any {
    return this.HttpClient.put(`${this.baseUrl}/OnHoldReservation/${id}`, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  ApprovedReservation(id: Object): any {


    return this.HttpClient.put(`${this.baseUrl}/ApprovedReservation/${id}`, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  UnapprovedReservation(id: Object): any {
    return this.HttpClient.put(`${this.baseUrl}/UnapprovedReservation/${id}`, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  CancelReservation(id: Object): any {
    return this.HttpClient.delete(`${this.baseUrl}/CancelReservation/${id}`, {
      headers: {
        authorization: `Bearer__${localStorage.getItem('userToken')}`,
      },
    });
  }
  // sendReservationData(data: any): any {
  //   return this.HttpClient.post(`${this.baseUrl}/sendReservationData`,data, {

  //   });
  // }
  sendUnapproved(id: any): any {
    let data = {
      id
    }
    return this.HttpClient.post(`${this.baseUrl}/sendUnapproved`,data, {

    });
  }
  sendApproved(id: any): any {
    let data = {
      id
    }
    return this.HttpClient.post(`${this.baseUrl}/sendApproved`,data, {

    });
  }

}
