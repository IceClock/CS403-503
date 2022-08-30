import { NgModule } from "@angular/core";
import { FrameComponent } from "./frame.component";
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { TitleComponent } from './title/title.component';

@NgModule({
    declarations: [
        FrameComponent,
        FooterComponent,
        TitleComponent
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