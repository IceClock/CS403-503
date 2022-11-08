import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoxComponent } from "./lox.component";
import { LoxRoutingModule } from "./lox-routing.module";

@NgModule({
    declarations: [
        LoxComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSnackBarModule,
        LoxRoutingModule
    ],
    exports: [
        LoxComponent
    ]
})
export class LoxModule {}