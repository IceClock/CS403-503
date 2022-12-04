import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TESTS } from 'src/assets/tests';
import { SpanishScanner } from '../interpreter/src-spanish/spanish-scanner';
import { Scanner, Token } from '../interpreter/src/scanner';
import { OutputHandlingService } from '../services/error-handling.service';

@Component({
  selector: 'app-lox-scanner',
  templateUrl: './lox-scanner.component.html',
  styleUrls: ['./lox-scanner.component.css']
})
export class LoxScannerComponent implements OnInit {

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

  error$ = this.outputHnadingService.errorOccured$;

  printSubject$ = this.outputHnadingService.printSubject$;

  ngOnInit(): void {
    this.run();
    this.error$.subscribe((e) => {
      if(e)
      this._snackBar.open(e, 'close', {
        panelClass: ['mat-toolbar', 'mat-warn', 'error'],
        politeness: 'assertive',
        duration: 2000
      })
    })

    this.printSubject$.subscribe((output) => {

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
      case "inheritance":
        this.tests = this.testCases.if;
        break;
      case "logical_operator":
        this.tests = this.testCases.logical_operator;
        break;
      case "misc":
        this.tests = this.testCases.misc;
        break;
      case "method":
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

  testValue = ''
  tokens: Token[] = [];
  displayedColumns: string[] = ['type', 'typeString', 'lexeme' , 'litral', 'line'];



  run() {
    if (this.spanishMode) {
      let spanishScanner = new SpanishScanner(this.testValue);
      let spanishTokens = spanishScanner.scanTokens();
      this.tokens = spanishTokens;
    } else {
      let scanner = new Scanner(this.testValue);
      let tokens = scanner.scanTokens();
      this.tokens = tokens;
    }

  }
}

