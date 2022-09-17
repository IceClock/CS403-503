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
        path: 'lox-scanner',
        loadChildren: () => import('./lox-scanner/lox-scanner.module').then(m => m.LoxScannerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
