import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charachters-list',
  templateUrl: './charachters-list.component.html',
  styleUrls: ['./charachters-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharachtersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
