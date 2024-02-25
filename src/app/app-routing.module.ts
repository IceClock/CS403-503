import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './frame/frame.component';

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('./scanner-component/scanner.module').then(m => m.LoxScannerModule)
      },
      {
        path: 'interpreter',
        loadChildren: () => import('./interpreter-component/interpreter.module').then(m => m.InterpreterModule)
      },
      {
        path: 'lisp-interpreter',
        loadChildren: () => import('./interpreter-lisp/lisp-interpreter.module').then(m => m.LispInterpreterModule)
      },
      {
        path: 'traveling-salesman',
        loadChildren: () => import('./travel-salesman/travel-salesman.module').then(m => m.TravelSalesmanModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
