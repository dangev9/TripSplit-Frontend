export interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  category: 'FOOD' | 'HOTEL' | 'TRANSPORT' | 'ACTIVITY' | 'OTHER';
  expenseDate: string;
  tripId?: number;
  paidByUserId: number;
  participantIds: number[];
}
