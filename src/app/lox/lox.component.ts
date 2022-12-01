import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TESTS } from 'src/assets/tests';
import { OutputHandlingService } from '../services/error-handling.service';
import { AstPrinter } from './src/ast';
import { Interpreter } from './src/interpreter';
import { Parser } from './src/parser';
import { Resolver } from './src/resolver';
import { Scanner } from './src/scanner';
import { SpanishScanner } from './src-spanish/spanish-scanner';
import { SpanishParser } from './src-spanish/parser';
import { SpanishInterpreter } from './src-spanish/interpreter';
import { SpanishResolver } from './src-spanish/resolver';

@Component({
  selector: 'app-lox',
  templateUrl: './lox.component.html',
  styleUrls: ['./lox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoxComponent implements OnInit {

  panelOpenState = false;

  testCases = TESTS;

  spanishMode = false;

  testCategories = [
    "assignment",
    "block",
    "bool",
    "call",
    "class",
    "closure",
    "comments",
    "constructor",
    "field",
    "for",
    "function",
    "if",
    "inheritance",
    "logical_operator",
    "method",
    "misc",
    "nil",
    "number",
    "operator",
    "print",
    "regression",
    "return",
    "string",
    "super",
    "this",
    "variable",
    "while",
    "Spanish"
  ];

  tests:{
    testLabel: string;
    testValue: string;
    }[] = [];

  selectedCategory = "";

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

  modeChanged() {
    if (this.spanishMode) {
      this.selectedCategory = "Spanish";
      this.categoryChanged("Spanish");
    } else {
      this.selectedCategory = "";
      this.categoryChanged("");
    }
  }

  categoryChanged(category: string) {
    switch (category) {
      case "assignment":
        this.tests = this.testCases.assignment;
        break;
      case "block":
        this.tests = this.testCases.block;
        break;
      case "bool":
        this.tests = this.testCases.bool;
        break;
      case "call":
        this.tests = this.testCases.call;
        break;
      case "class":
        this.tests = this.testCases.class;
        break;
      case "closure":
        this.tests = this.testCases.closure;
        break;
      case "comments":
        this.tests = this.testCases.comments;
        break;
      case "constructor":
        this.tests = this.testCases.constructors;
        break;
      case "field":
        this.tests = this.testCases.field;
        break;
      case "for":
        this.tests = this.testCases.for;
        break;
      case "function":
        this.tests = this.testCases.function;
        break;
      case "if":
        this.tests = this.testCases.if;
        break;
      case "logical_operator":
        this.tests = this.testCases.logical_operator;
        break;
      case "misc":
        this.tests = this.testCases.misc;
        break;
      case "nil":
        this.tests = this.testCases.nil;
        break;
      case "number":
        this.tests = this.testCases.number;
        break;
      case "operator":
        this.tests = this.testCases.operator;
        break;
      case "print":
        this.tests = this.testCases.print;
        break;
      case "regression":
        this.tests = this.testCases.regression;
        break;
      case "return":
        this.tests = this.testCases.return;
        break;
      case "string":
        this.tests = this.testCases.string;
        break;
      case "super":
        this.tests = this.testCases.super;
        break;
      case "this":
        this.tests = this.testCases.this;
        break;
      case "variable":
        this.tests = this.testCases.variable;
        break;
      case "while":
        this.tests = this.testCases.while;
        break;
      case "Spanish":
        this.tests = this.testCases.Spanish;
        break;
      default:
        this.tests = [];
        break;
    }
  }

  testValue = '';
  output = '';
  printingStmts: string[] = [];
  logs: string[] = [];
  errors: string[] = [];

  run() {
    this.printingStmts = [];
    if (this.spanishMode) {
      try {
        let interpreter = new SpanishInterpreter();
        let resolver = new SpanishResolver(interpreter);
        let spanishScanner = new SpanishScanner(this.testValue);
        let tokens = spanishScanner.scanTokens();
        let parser = new SpanishParser(tokens);
        const [statements, expr] = parser.parseRepl();
        const astPrinter = new AstPrinter();
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
      } catch {
        this.outputHnadingService.errorOccured("Something went wrong.");
      }
    } else {
      let interpreter = new Interpreter();
      let resolver = new Resolver(interpreter);
      let scanner = new Scanner(this.testValue);
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
      } catch {
        this.outputHnadingService.errorOccured("Something went wrong.");
      }
    }

  
  }

  clear() {
    this.testValue = '';
    this.run();
    this.errors = [];
    this.logs = [];
    this.printingStmts = [];
  }

}
