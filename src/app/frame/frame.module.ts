import { NgModule } from "@angular/core";
import { FrameComponent } from "./frame.component";
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";

@NgModule({
    declarations: [
        FrameComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        FrameComponent
    ]
})
export class FrameModule {}