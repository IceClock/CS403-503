import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpreter-panel',
  templateUrl: './interpreter-panel.component.html',
  styleUrls: ['./interpreter-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
