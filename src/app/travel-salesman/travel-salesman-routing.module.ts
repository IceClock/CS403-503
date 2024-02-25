import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelSalesmanComponent } from './travel-salesman.component';

const routes: Routes = [
  {
    path: '',
    component: TravelSalesmanComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterpreterRoutingModule { }
