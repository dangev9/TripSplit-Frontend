import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Trip} from '../models/trip.model';
import { AiSummary } from "../models/aisummary.model";

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private apiUrl = 'http://localhost:8080/api/trips';

  constructor(private http: HttpClient) {
  }

  getMyTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  updateTrip(id: number, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip);
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAiSummary(tripId: number): Observable<AiSummary> {
    return this.http.get<AiSummary>(`${this.apiUrl}/${tripId}/ai-summary`);
  }
}
