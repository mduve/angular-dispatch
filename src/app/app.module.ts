import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectBranchComponent } from './components/select-branch/select-branch.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { DispatchComponent } from './components/dispatch/dispatch.component';
import { Dispatch5Component } from './components/dispatch5/dispatch5.component';
import { Dispatch6Component } from './components/dispatch6/dispatch6.component';

import { SettingsComponent } from './components/settings/settings.component';
import { ManageComponent } from './components/manage/manage.component';

import { StocksService } from './services/stocks.service';
import { FirecloudService } from './services/firecloud.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
    StocksTableComponent,
    DispatchComponent,
    Dispatch5Component,
    Dispatch6Component,
    SettingsComponent,
    ManageComponent,
    SelectBranchComponent
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
    FirecloudService,
  ],
  //schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
