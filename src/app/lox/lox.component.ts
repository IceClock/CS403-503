import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutputHandlingService } from '../services/error-handling.service';
import { AstPrinter } from './src/ast';
import { Interpreter } from './src/interpreter';
import { Parser } from './src/parser';
import { Resolver } from './src/resolver';
import { Scanner } from './src/scanner';

@Component({
  selector: 'app-lox',
  templateUrl: './lox.component.html',
  styleUrls: ['./lox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoxComponent implements OnInit {

  panelOpenState = false;

  constructor(
    private outputHnadingService: OutputHandlingService,
    private _snackBar: MatSnackBar
    ) { }

  syntaxError$ = this.outputHnadingService.errorOccured$;
  printSubject$ = this.outputHnadingService.printSubject$;

  ngOnInit(): void {
    this.run();
    this.syntaxError$.subscribe((x) => {
      if(x)
      this._snackBar.open(x, 'close', {
        panelClass: ['mat-toolbar', 'mat-warn', 'error'],
        politeness: 'assertive',
        duration: 6000
      });
      this.errors.push(x);
    })
    this.printSubject$.subscribe((output) => {
      this.printingStmts.push(output);
    });
  }

  value = '';
  output = '';
  printingStmts: string[] = [];
  logs: string[] = [];
  errors: string[] = [];

  tests = [
    {testValue: 'print "Hello, world!";', testLabel: 'Hello World'},
    {testValue: `
    var a = "a";
    var b = "b";
    var c = "c";
    
    // Assignment is right-associative.
    a = b = c;
    print a; // expect: c
    print b; // expect: c
    print c; // expect: c`, testLabel: 'Associativity'},
    {testValue: `
      var a = "before";
      print a; // expect: before

      a = "after";
      print a; // expect: after

      print a = "arg"; // expect: arg
      print a; // expect: arg`, testLabel: 'Global'},
    {testValue: `
    var a = "a";
    (a) = "value"; // Error at '=': Invalid assignment target.
      `, testLabel: 'Grouping'},
    {testValue: `
    var a = "a";
    var b = "b";
    a + b = "value"; // Error at '=': Invalid assignment target.
      `, testLabel: 'Infix operator'},
    {testValue: `
    {
      var a = "before";
      print a; // expect: before
    
      a = "after";
      print a; // expect: after
    
      print a = "arg"; // expect: arg
      print a; // expect: arg
    }
      `, testLabel: 'Local'},
    {testValue: `
    var a = "a";
    !a = "value"; // Error at '=': Invalid assignment target.
      `, testLabel: 'Prefix operator'},
    {testValue: `
    // Assignment on RHS of variable.
    var a = "before";
    var c = a = "var";
    print a; // expect: var
    print c; // expect: var
      `, testLabel: 'Syntax'},
    {testValue: `
    class Foo {
      Foo() {
        this = "value"; // Error at '=': Invalid assignment target.
      }
    }
    
    Foo();
      `, testLabel: 'To this'},
    {testValue: `
    unknown = "what"; // expect runtime error: Undefined variable 'unknown'.
      `, testLabel: 'Undefined'},
    {testValue: `
      `, testLabel: ''},
    {testValue: `
      `, testLabel: ''},

  ]

  run() {
    this.printingStmts = [];
    let interpreter = new Interpreter();
    let resolver = new Resolver(interpreter);
    let scanner = new Scanner(this.value);
    let tokens = scanner.scanTokens();
    let parser = new Parser(tokens);
    const [statements, expr] = parser.parseRepl();
    const astPrinter = new AstPrinter();
    try {
      if (statements.length > 0) {
       resolver.resolve(statements);
       console.log(astPrinter.stringify(statements));
       this.output = interpreter.interpret(statements);
       this.logs.push(`Parsed ${astPrinter.stringify(statements)} |  Interpreted: ${this.output}`);
      }
      if (expr !== null) {
        resolver.resolve(expr)
        console.log(astPrinter.stringify(expr));
        this.output = interpreter.interpret(expr);
        this.logs.push(`Parsed: ${astPrinter.stringify(expr)} | Interpreted: ${this.output}`);
      }
    } catch {}
  
  }

  clear() {
    this.value = '';
    this.run();
    this.errors = [];
    this.logs = [];
    this.printingStmts = [];
  }

}
