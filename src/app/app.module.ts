import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameModule } from './frame/frame.module';
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FrameModule,
    MatIconModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxsModule.forRoot([]),
    NgxsRouterPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
