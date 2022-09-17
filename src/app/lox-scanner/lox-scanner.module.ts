import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { LoxScannerComponent } from "./lox-scanner.component";
import { DashboardRoutingModule } from "./lox-scanner-routing.module";


@NgModule({
    declarations: [
        LoxScannerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [
        LoxScannerComponent
    ]
})
export class LoxScannerModule {}