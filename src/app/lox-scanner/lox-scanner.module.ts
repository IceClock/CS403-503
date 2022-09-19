import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { LoxScannerComponent } from "./lox-scanner.component";
import { LoxScannerRoutingModule } from "./lox-scanner-routing.module";
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        LoxScannerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        LoxScannerRoutingModule,
        MatInputModule,
        MatTableModule
    ],
    exports: [
        LoxScannerComponent
    ]
})
export class LoxScannerModule {}