import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SHARED_IMPORTS} from '../../../shared/shared-imports';
import {Trip} from '../../../core/models/trip.model';
import {TripService} from '../../../core/services/trip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TripMember} from '../../../core/models/member.model';
import {MemberService} from '../../../core/services/member.service';
import {Expense} from '../../../core/models/expense.model';
import {ExpenseService} from '../../../core/services/expense.service';
import {Balance} from '../../../core/models/balance.model';
import {BalanceService} from '../../../core/services/balance.service';

@Component({
  selector: 'app-trip-details',
  imports: [...SHARED_IMPORTS, MatButtonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.css',
})
export class TripDetails implements OnInit {

  trip?: Trip;
  tripId!: number;
  members: TripMember[] = [];
  expenses: Expense[] = [];
  balances: Balance[] = [];
  memberForm!: FormGroup;
  expenseForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tripService: TripService,
              private cdr: ChangeDetectorRef,
              private memberService: MemberService,
              private fb: FormBuilder,
              private expenseService: ExpenseService,
              private balanceService: BalanceService) {}


  ngOnInit() {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeMemberForm();
    this.loadTrip();
    this.loadMembers();
    this.initializeExpenseForm();
    this.loadExpenses();
    this.loadBalances();
  }

  loadTrip() {
    this.loading = true;
    this.errorMessage = '';

    this.tripService.getTrip(this.tripId).subscribe({
      next: (trip) => {
        this.trip = trip;
        this.loading = false;
        this.cdr.detectChanges();

      },
      error: (error) => {
        this.errorMessage = 'Failed to load trip or you do not have access.';
        this.loading = false;      }
    })
  }

  loadExpenses(): void {
    this.expenseService.getExpenses(this.tripId).subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.cdr.detectChanges();
        },
      error: (error) => console.error('Failed to load expenses', error)
    });
  }

  loadBalances(): void {
    this.balanceService.getBalances(this.tripId).subscribe({
      next: (balances) => {
        this.balances = balances;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Failed to load balances', error)
    });
  }

  initializeExpenseForm(): void {
    this.expenseForm = this.fb.group({
      title: [''],
      description: [''],
      amount: [''],
      category: ['FOOD'],
      expenseDate: [''],
      paidByUserId: [''],
      participantIds: ['']
    });
  }

  loadMembers(): void {
    this.memberService.getMembers(this.tripId).subscribe({
      next: (members) => {
        this.members = members;
        this.cdr.detectChanges();
      },
      error: (error) => this.errorMessage = 'Failed to load members.'
    });
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }

  initializeMemberForm(): void {
    this.memberForm = this.fb.group({
      userId: ['']
    });
  }

  addMember(): void {
    const userId = Number(this.memberForm.value.userId);

    if (!userId) {
      this.errorMessage = 'Please enter a valid user ID.';
      return;
    }

    this.memberService.addMember(this.tripId, userId).subscribe({
      next: () => {
        this.successMessage = 'Member added successfully.';
        this.memberForm.reset();
        this.loadMembers();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to add member.'
      }
    });
  }

  removeMember(userId: number): void {
    if (!confirm('Remove this member from the trip?')) {
      return;
    }

    this.memberService.removeMember(this.tripId, userId).subscribe({
      next: () => {
        this.loadMembers();
        this.successMessage = 'Member removed successfully.';
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to remove member.';
      }
    });
  }

  createExpense(): void {
    const formValue = this.expenseForm.value;

    if (!formValue.title || !formValue.amount || !formValue.paidByUserId || !formValue.participantIds) {
      this.errorMessage = 'Please fill in all required expense fields.';
      return;
    }

    const expense = {
      ...formValue,
      amount: Number(formValue.amount),
      paidByUserId: Number(formValue.paidByUserId),
      participantIds: formValue.participantIds
        .split(',')
        .map((id: string) => Number(id.trim()))
    };

    this.expenseService.createExpense(this.tripId, expense).subscribe({
      next: () => {
        this.successMessage = 'Expense added successfully.';
        this.expenseForm.reset({ category: 'FOOD' });
        this.loadExpenses();
        this.cdr.detectChanges();
      },
      error: (error) => this.errorMessage = 'Failed to add member.'
    });
  }

  deleteExpense(expenseId?: number): void {
    if (!expenseId) return;

    if (!confirm('Delete this expense?')) {
      return;
    }

    this.expenseService.deleteExpense(expenseId).subscribe({
      next: () => {
        this.loadExpenses();
        this.successMessage = 'Expense deleted successfully.';
        this.cdr.detectChanges();
        },
      error: (error) =>
        this.errorMessage = 'Failed to delete expense.'
    });
  }


}
