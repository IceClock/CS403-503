import { Component, OnInit } from '@angular/core';
import { Scanner, Token } from './scanner';

@Component({
  selector: 'app-lox-scanner',
  templateUrl: './lox-scanner.component.html',
  styleUrls: ['./lox-scanner.component.css']
})
export class LoxScannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.run();
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
