import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
