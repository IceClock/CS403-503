import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlingService } from '../services/error-handling.service';
import { AstPrinter } from './src/ast';
import { Parser } from './src/parser';
import { Scanner } from './src/scanner';

@Component({
  selector: 'app-lox',
  templateUrl: './lox.component.html',
  styleUrls: ['./lox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoxComponent implements OnInit {


  constructor(
    private errorHnadingService: ErrorHandlingService,
    private _snackBar: MatSnackBar
    ) { }

  syntaxError$ = this.errorHnadingService.syntaxErrorOccured$;

  ngOnInit(): void {
    this.run();
    this.syntaxError$.subscribe((x) => {
    })
    this.errorHnadingService.syntaxErrorOccured$.subscribe((e) => {
      if(e)
      this._snackBar.open(e, 'close', {
        panelClass: ['mat-toolbar', 'mat-warn', 'error'],
        politeness: 'assertive',
        duration: 2000
      })
      })
  }

  value = ''
  output: string = '';
  displayedColumns: string[] = ['type', 'typeString', 'lexeme' , 'litral', 'line'];

  tests = [
    {testValue: 'print "Hello, world!";', testLabel: 'Hello World'},
    {testValue: 'var language = "lox";', testLabel: 'String assignemnt'},
    {testValue: 'var digit = 123;', testLabel: 'Digit assignment'},
    {testValue: '@', testLabel: 'Unexpected character'},
  ]

  run() {
    let scanner = new Scanner(this.value);
    let tokens = scanner.scanTokens();
    let parser = new Parser(tokens);
    const [statements, expr] = parser.parseRepl();
    const astPrinter = new AstPrinter();
    try {
      if (statements.length > 0) {
       this.output = astPrinter.stringify(statements);
      }
      if (expr !== null) {
        this.output = astPrinter.stringify(expr);
      }
    } catch {}
  
  }

}
