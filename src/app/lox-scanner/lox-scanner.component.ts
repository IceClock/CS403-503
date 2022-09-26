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

  value = 'var start = "Hello, world!";'
  tokens: Token[] = [];
  displayedColumns: string[] = ['type', 'typeString', 'lexeme' , 'litral', 'line'];

  // tests = [
  //   {testValue: '', testLabel: ''},
  //   {testValue: '', testLabel: ''},
  //   {testValue: '', testLabel: ''},
  //   {testValue: '', testLabel: ''},
  //   {testValue: '', testLabel: ''},
  //   {testValue: '', testLabel: ''},
  // ]
  run() {
    let scanner = new Scanner(this.value);
    let tokens = scanner.scanTokens();
    this.tokens = tokens;
  }
}
