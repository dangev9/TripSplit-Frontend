import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Trip} from '../../core/models/trip.model';
import {TripService} from '../../core/services/trip.service';
import {SHARED_IMPORTS} from '../../shared/shared-imports';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [...SHARED_IMPORTS, MatButtonModule, ReactiveFormsModule
    ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  ngOnInit() {
    this.initializeForm();
    this.loadTrips();
  }
  trips: Trip[] = [];
  tripForm!: FormGroup;
  showCreateForm =  false;

  constructor(private fb: FormBuilder,
              private tripService: TripService,
              private authService: AuthService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  loadTrips(): void {
    this.tripService.getMyTrips().subscribe({
      next: (trips) => {
          this.trips = trips;
          this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load trips', error);
      }
    });
  }

  createTrip(): void {
    this.tripService.createTrip(this.tripForm.value).subscribe({
      next: () => {
        this.tripForm.reset({
          currency: 'EUR'
        });
        this.showCreateForm = false;
        this.loadTrips();
      },
      error: (error) => {
        console.error('Failed to create trip', error);
      }
    });
  }

  openTrip(tripId?: number): void {
    if (!tripId) return;
    this.router.navigate(['/trips', tripId]);
  }

  deleteTrip(tripId?: number): void {
    if (!tripId) return;

    this.tripService.deleteTrip(tripId).subscribe({
      next: () => {
        this.loadTrips();
      },
      error: (error) => {
        console.error('Failed to delete trip', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

   initializeForm(): void {
    this.tripForm = this.fb.group({
      title: [''],
      description: [''],
      currency: ['EUR'],
      startDate: [''],
      endDate: ['']
    });
  }

}
