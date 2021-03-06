import {Customer} from "./customer";
import {Bike} from "./bike";
import {Item} from "./item";
import {Repair} from "./repair";

export class Transaction {
  _id: string;
  date_created: string;
  date_completed: string;
  complete: boolean;
  is_paid: boolean;
  waiting_part: boolean;
  waiting_email: boolean;
  total_cost: number;
  description: string;
  transaction_type: string;
  customer: Customer;
  bikes: Bike[];
  items: Item[];
  repairs: Repair[];

  constructor() {}
}
