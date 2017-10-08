import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ReviewComponent } from './review/review.component';
import { routes } from './app.routes';
import { AgmCoreModule } from '@agm/core';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ReviewComponent,
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
    DragulaService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
