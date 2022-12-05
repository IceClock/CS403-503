import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputHandlingService {

  static instance: OutputHandlingService;

  static getInstance() {
    if (OutputHandlingService.instance) {
      return OutputHandlingService.instance;
    }

    OutputHandlingService.instance = new OutputHandlingService();
    return OutputHandlingService.instance;
  }

  private errorOccured$$ = new BehaviorSubject<string>('');
  private printSubject$$ = new BehaviorSubject<string>('');

  errorOccured$ = this.errorOccured$$.asObservable();
  printSubject$ = this.printSubject$$.asObservable();

  constructor() {
    if (!OutputHandlingService.instance) {
      OutputHandlingService.instance = this;
    }
    return OutputHandlingService.instance;

   }

  errorOccured(errorMsg: string) {
      this.errorOccured$$.next(errorMsg);
  }

  print(x: string) {
    this.printSubject$$.next(x);
  }


}
