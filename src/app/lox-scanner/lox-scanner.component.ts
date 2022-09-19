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

  value = 'print "Hello, world!";'
  tokens: Token[] = [];
  displayedColumns: string[] = ['type-number', 'type', 'lexme' , 'litral', 'line'];


  run() {
    let scanner = new Scanner(this.value);
    let tokens = scanner.scanTokens();
    this.tokens = tokens;
  }
}
