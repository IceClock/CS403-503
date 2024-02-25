import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InterpreterRoutingModule } from "./travel-salesman-routing.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { TravelSalesmanComponent } from "./travel-salesman.component";
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [
        TravelSalesmanComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatSnackBarModule,
        InterpreterRoutingModule,
        MatSlideToggleModule,
        HttpClientModule,
        MatChipsModule
    ],
    exports: [
        TravelSalesmanComponent
    ]
})
export class TravelSalesmanModule {}