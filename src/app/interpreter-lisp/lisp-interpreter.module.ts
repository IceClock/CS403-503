import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LispInterpreterRoutingModule } from "./lisp-interpreter-routing.module";
import { LispInterpreterComponent } from "./lisp-interpreter/lisp-interpreter.component";

@NgModule({
    declarations: [
        LispInterpreterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSnackBarModule,
        LispInterpreterRoutingModule
    ],
    exports: [
        LispInterpreterComponent
    ]
})
export class LispInterpreterModule {}