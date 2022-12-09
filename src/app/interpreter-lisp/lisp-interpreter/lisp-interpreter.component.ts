import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OutputHandlingService } from 'src/app/services/output-handling.service';
import { LISP_TESTS } from 'src/assets/lisp-tests';
import * as lisp from '../src/lisp'

@Component({
  selector: 'app-lisp-interpreter',
  templateUrl: './lisp-interpreter.component.html',
  styleUrls: ['./lisp-interpreter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LispInterpreterComponent implements OnInit {


  tests = LISP_TESTS;
  testValue = ``;
  printingStmts: any = [];
  errorLog: any = [];

  constructor() { }

  ngOnInit(): void {
    OutputHandlingService.getInstance().printSubject$.subscribe((x) => {
      this.printingStmts.push(x);
    });
    OutputHandlingService.getInstance().errorOccured$.subscribe((x) => {
      this.errorLog.push(x);
    });
  }

  clear() {
    this.printingStmts = [];
    this.errorLog = [];
  }

  run() {
    this.printingStmts = [];
    this.errorLog = [];
    const interp = new lisp.Interp();
    lisp.run(interp, lisp.prelude);
    lisp.run(interp, this.testValue);

  }


}
