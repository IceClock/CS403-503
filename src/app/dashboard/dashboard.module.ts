import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { InterpreterPanelComponent } from './interpreter-panel/interpreter-panel.component';
import { InterpreterListComponent } from './interpreter-list/interpreter-list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        InterpreterPanelComponent,
        InterpreterListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule {}