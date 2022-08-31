import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FamousCharacterPanelComponent } from './famous-character-panel/famous-character-panel.component';
import { LanguageHistoryPanelComponent } from "./language-history-panel/language-history-panel.component";

@NgModule({
    declarations: [
        DashboardComponent,
        FamousCharacterPanelComponent,
        LanguageHistoryPanelComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule {}