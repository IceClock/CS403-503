import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterpreterComponent } from "./interpreter.component";
import { InterpreterRoutingModule } from "./interpreter-routing.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
    declarations: [
        InterpreterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSnackBarModule,
        InterpreterRoutingModule,
        MatSlideToggleModule
    ],
    exports: [
        InterpreterComponent
    ]
})
export class LoxModule {}