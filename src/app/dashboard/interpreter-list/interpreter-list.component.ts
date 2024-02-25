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

  goToScanner () {
    this.navigation.viewScanner();
  }
  goToInterpreter () {
    this.navigation.viewInterpreter();
  }
  goToLispInterpreter () {
    this.navigation.viewLispInterpreter();
  }
  goToTravelingSalesman () {
    this.navigation.viewTravelingSalesman();
  }
}
