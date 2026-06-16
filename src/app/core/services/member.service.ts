import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TripMember} from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/api/trips';

  constructor(private http: HttpClient) {}

  getMembers(tripId: number): Observable<TripMember[]> {
    return this.http.get<TripMember[]>(`${this.apiUrl}/${tripId}/members`);
  }

  addMember(tripId: number, userId: number): Observable<TripMember> {
    return this.http.post<TripMember>(`${this.apiUrl}/${tripId}/members/${userId}`, {});
  }

  removeMember(tripId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tripId}/members/${userId}`);
  }
}
