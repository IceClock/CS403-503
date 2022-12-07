import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LispInterpreterComponent } from './lisp-interpreter/lisp-interpreter.component';

const routes: Routes = [
  {
    path: '',
    component:LispInterpreterComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LispInterpreterRoutingModule { }
