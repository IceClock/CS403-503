import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  static instance: ErrorHandlingService;

  static getInstance() {
    if (ErrorHandlingService.instance) {
      return ErrorHandlingService.instance;
    }

    ErrorHandlingService.instance = new ErrorHandlingService();
    return ErrorHandlingService.instance;
  }

  private syntaxErrorOccured$$ = new BehaviorSubject<string[]>([]);

  private syntaxErrors: string[] = []

  syntaxErrorOccured$ = this.syntaxErrorOccured$$.asObservable();

  constructor() {
    if (!ErrorHandlingService.instance) {
      ErrorHandlingService.instance = this;
    }
    return ErrorHandlingService.instance;

   }

  syntaxErrorOccured(errorMsg: string) {
    if(!this.syntaxErrors.includes(errorMsg) && errorMsg != 'pop') {
      this.syntaxErrors.push(errorMsg);
      this.syntaxErrorOccured$$.next(this.syntaxErrors);
    } else if (errorMsg == 'pop') {
      this.syntaxErrors = [];
    }
  }


}
