import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { DispatchComponent } from './components/dispatch/dispatch.component';
import { Dispatch1Component } from './components/dispatch1/dispatch1.component';
import { Dispatch2Component } from './components/dispatch2/dispatch2.component';
import { Dispatch3Component } from './components/dispatch3/dispatch3.component';
import { Dispatch4Component } from './components/dispatch4/dispatch4.component';
import { Dispatch5Component } from './components/dispatch5/dispatch5.component';
import { FcSearchComponent } from './components/fc-search/fc-search.component';

import { SettingsComponent } from './components/settings/settings.component';
import { ManageComponent } from './components/manage/manage.component';

import { StocksService } from './services/stocks.service';
import { StocksServiceNoMattable } from './services/stocks.service-nomattable';
import { StocksMockService } from './services/stocks-mock.service';
import { StocksMockService2 } from './services/stocks-mock2.service';
import { Dispatch1Service } from './services/dispatch1.service';
import { FirecloudService } from './services/firecloud.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ValuesPipe } from './pipes/values.pipe';
import { AgmCoreModule } from '@agm/core';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';

import { environment } from './../environments/environment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule } from '@angular/material';

@NgModule({
  exports: [ MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, ],
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    StocksTableComponent,
    ValuesPipe,
    DispatchComponent,
    Dispatch1Component,
    Dispatch2Component,
    Dispatch3Component,
    Dispatch4Component,
    Dispatch5Component,
    FcSearchComponent,
    SettingsComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS808u5TUXAwm39cWWgdO-mrSR6NLzXYc'
    }),
    DragulaModule,
    routes,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxDatatableModule
  ],
  providers: [
    DragulaService,
    StocksService,
    Dispatch1Service,
    FirecloudService,
    StocksMockService,
    StocksMockService2,
    StocksServiceNoMattable,
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
