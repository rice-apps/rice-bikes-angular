import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import {TransactionDetailComponent} from "./components/transaction-detail/transaction-detail.component";
import {NewTransactionComponent} from "./components/new-transaction/new-transaction.component";
import {ActiveTransactionsComponent} from "./components/active-transactions/active-transactions.component";
import {CompletedTransactionsComponent} from "./components/completed-transactions/completed-transactions.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/transactions/active',
    pathMatch: 'full'
  },

  {
    path: 'transactions',
    children: [
      {
        path: '',
        component: TransactionsComponent,
        pathMatch: 'full'
      },

      {
        path: 'new',
        component: NewTransactionComponent
      },

      {
        path: 'active',
        component: ActiveTransactionsComponent
      },

      {
        path: 'complete',
        component: CompletedTransactionsComponent
      },

      {
        path: ':_id',
        component: TransactionDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
