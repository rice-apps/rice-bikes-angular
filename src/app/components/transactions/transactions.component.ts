import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.css'],
  providers: [TransactionService]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  loading = true;

  constructor(public transactionService: TransactionService) { }

  currentTab = 'active';

  ngOnInit(): void {
    this.getTransactions(this.currentTab, { complete: false , refurb: false});
  }

  /**
   * Sets the current tab to the given string. Accepts optional props to request the backend with.
   * @param {string} tab
   * @param {Object} props
   */
  getTransactions(tab: string, props?: Object): void {
    this.loading = true;
    this.transactionService.getTransactions(props)
      .then(transactions => {
        this.transactions = transactions;
        this.loading = false;
        this.currentTab = tab;
      });
  }

  getTimeDifference(transaction: Transaction): number {
    let created = Date.now();
    if (this.currentTab === 'active') {
      created = Date.parse(transaction.date_created);
    } else if (this.currentTab === 'completed') {
      created = Date.parse(transaction.date_completed);
    }
    const diff = Date.now() - created;
    return Math.floor(diff / 1000 / 60 / 60 / 24);
  }

  getBikeList(transaction: Transaction): string[] {
    return transaction.bikes.map((b) => `${b.make} ${b.model}`);
  }
}
