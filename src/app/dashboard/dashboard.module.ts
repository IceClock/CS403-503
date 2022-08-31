import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FamousCharacterPanelComponent } from './famous-character-panel/famous-character-panel.component';
import { LanguageHistoryPanelComponent } from "./language-history-panel/language-history-panel.component";
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { CharachtersListComponent } from './charachters-list/charachters-list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        FamousCharacterPanelComponent,
        LanguageHistoryPanelComponent,
        LanguagesListComponent,
        CharachtersListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule {}