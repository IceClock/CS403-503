import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Scanner, Token } from '../interpreter/src/scanner';
import { OutputHandlingService } from '../services/error-handling.service';

@Component({
  selector: 'app-lox-scanner',
  templateUrl: './lox-scanner.component.html',
  styleUrls: ['./lox-scanner.component.css']
})
export class LoxScannerComponent implements OnInit {

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

  value = ''
  tokens: Token[] = [];
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
    this.tokens = tokens;
  }
}

