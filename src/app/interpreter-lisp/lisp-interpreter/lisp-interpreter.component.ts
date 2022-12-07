import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OutputHandlingService } from 'src/app/services/output-handling.service';
import * as lisp from '../src/lisp'

@Component({
  selector: 'app-lisp-interpreter',
  templateUrl: './lisp-interpreter.component.html',
  styleUrls: ['./lisp-interpreter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LispInterpreterComponent implements OnInit {


  testValue = `
                (define fib (n)
                (if (<= n 1)
                    n
                  (+ (fib (- n 1))
                    (fib (- n 2)))))

              (print (fib 5))   ; => 5
              (print (fib 10))          ; => 55`;
  printingStmts: any = [];

  constructor() { }

  ngOnInit(): void {
    OutputHandlingService.getInstance().printSubject$.subscribe((x) => {
      this.printingStmts.push(x);
    })
  }

  clear() {
    this.printingStmts = [];
  }

  run() {
    this.printingStmts = [];
    const interp = new lisp.Interp();
    lisp.run(interp, lisp.prelude);
    lisp.run(interp, this.testValue);

  }


}
