import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-interpreter-list',
  templateUrl: './interpreter-list.component.html',
  styleUrls: ['./interpreter-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterpreterListComponent implements OnInit {

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  goToLoxScanner () {
    this.navigation.viewLoxScanner();
  }
  goToLox () {
    this.navigation.viewLox();
  }
}
