import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { ScannerComponent } from "./scanner.component";
import { LoxScannerRoutingModule } from "./scanner-routing.module";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        ScannerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        LoxScannerRoutingModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    exports: [
        ScannerComponent
    ]
})
export class LoxScannerModule {}