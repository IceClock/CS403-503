import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpreter-list',
  templateUrl: './interpreter-list.component.html',
  styleUrls: ['./interpreter-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
