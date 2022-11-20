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

  private syntaxErrorOccured$$ = new BehaviorSubject<string>('');
  private printSubject$$ = new BehaviorSubject<string>('');

  syntaxErrorOccured$ = this.syntaxErrorOccured$$.asObservable();
  printSubject$ = this.printSubject$$.asObservable();

  constructor() {
    if (!OutputHandlingService.instance) {
      OutputHandlingService.instance = this;
    }
    return OutputHandlingService.instance;

   }

  syntaxErrorOccured(errorMsg: string) {
      this.syntaxErrorOccured$$.next(errorMsg);
  }

  print(x: string) {
    this.printSubject$$.next(x);
  }


}
