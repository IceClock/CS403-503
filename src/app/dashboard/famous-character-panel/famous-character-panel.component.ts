import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-famous-character-panel',
  templateUrl: './famous-character-panel.component.html',
  styleUrls: ['./famous-character-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamousCharacterPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
