import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getExpenses(tripId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/trips/${tripId}/expenses`);
  }

  createExpense(tripId: number, expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/trips/${tripId}/expenses`, expense);
  }

  deleteExpense(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expenses/${expenseId}`);
  }
}
