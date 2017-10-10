import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { routes } from './app.routes';
import { AgmCoreModule } from '@agm/core';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { SelectBranchComponent } from './select-branch/select-branch.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { StocksService } from './stocks.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DispatchComponent,
    ListComponent,
    SelectBranchComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS808u5TUXAwm39cWWgdO-mrSR6NLzXYc'
    }),    
    routes,
    DragulaModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DragulaService,
    StocksService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
