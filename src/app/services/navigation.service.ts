import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private store: Store) { }

  viewDashboard() {
    this.store.dispatch(new Navigate(['/']))
  }

  viewLoxScanner() {
    this.store.dispatch(new Navigate(['/lox-scanner']))
  }

  viewLox() {
    this.store.dispatch(new Navigate(['/lox']))
  }
}
