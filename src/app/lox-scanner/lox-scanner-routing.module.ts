import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoxScannerComponent } from './lox-scanner.component';

const routes: Routes = [
  {
    path: '',
    component: LoxScannerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoxScannerRoutingModule { }
