import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlingService } from '../services/error-handling.service';
import { AstPrinter } from './src/ast';
import { Interpreter } from './src/interpreter';
import { Parser } from './src/parser';
import { Scanner } from './src/scanner';

@Component({
  selector: 'app-lox',
  templateUrl: './lox.component.html',
  styleUrls: ['./lox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoxComponent implements OnInit {

  panelOpenState = true;

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

  value = '';
  output: string = '';
  logs: string[] = []

  tests = [
    // {testValue: 'print "Hello, world!";', testLabel: 'Hello World'},
    // {testValue: 'var language = "lox";', testLabel: 'String assignemnt'},
    // {testValue: 'var digit = 123;', testLabel: 'Digit assignment'},
    {testValue: '1+6', testLabel: 'Addition'},
    {testValue: '7*9', testLabel: 'Multiply'},
    {testValue: '9/3', testLabel: 'Division'},
    {testValue: '10 == 10', testLabel: 'Equality'},
    {testValue: '11 != 11', testLabel: 'Bang Op'},
    {testValue: '2 > 1', testLabel: 'Greater'},
    {testValue: '2 < 1', testLabel: 'Less'},
    {testValue: '2 <= 2', testLabel: 'Less Equal'},
    {testValue: '1 >= 1', testLabel: 'Greater Equal'},
    // {testValue: '@', testLabel: 'Unexpected character'},
  ]

  run() {
    let interpreter = new Interpreter();
    let scanner = new Scanner(this.value);
    let tokens = scanner.scanTokens();
    let parser = new Parser(tokens);
    const [statements, expr] = parser.parseRepl();
    const astPrinter = new AstPrinter();
    try {
      if (statements.length > 0) {
       console.log(astPrinter.stringify(statements));
       this.output = interpreter.interpret(statements);
       this.logs.push(`Parsed ${astPrinter.stringify(statements)} -> Interpreted ${interpreter.interpret(statements)}`);
      }
      if (expr !== null) {
        console.log(astPrinter.stringify(expr));
        this.output = interpreter.interpret(expr);
        this.logs.push(`Parsed ${astPrinter.stringify(expr)} -> Interpreted ${interpreter.interpret(expr)}`);
      }
    } catch {}
  
  }

}
