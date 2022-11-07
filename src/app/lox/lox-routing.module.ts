import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoxComponent } from './lox.component';

const routes: Routes = [
  {
    path: '',
    component: LoxComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoxRoutingModule { }
