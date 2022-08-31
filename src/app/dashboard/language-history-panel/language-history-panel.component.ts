import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-history-panel',
  templateUrl: './language-history-panel.component.html',
  styleUrls: ['./language-history-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageHistoryPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
