import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Balance } from '../models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private apiUrl = 'http://localhost:8080/api/trips';

  constructor(private http: HttpClient) {}

  getBalances(tripId: number): Observable<Balance[]> {
    return this.http.get<Balance[]>(`${this.apiUrl}/${tripId}/balances`);
  }
}
