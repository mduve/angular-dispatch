import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { DispatchComponent } from './components/dispatch/dispatch.component';
import { Dispatch5Component } from './components/dispatch5/dispatch5.component';
import { Dispatch6Component } from './components/dispatch6/dispatch6.component';
import { Dispatch7Component } from './components/dispatch7/dispatch7.component';
import { Dispatch8Component } from './components/dispatch8/dispatch8.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ManageComponent } from './components/manage/manage.component';
import { CrudStocksComponent } from './components/crud-stocks/crud-stocks.component';

export const router: Routes = [
	{ path: '', redirectTo: 'dispatch', pathMatch: 'full'},
	{ path: 'dispatch', component: DispatchComponent},
	{ path: 'dispatch5', component: Dispatch5Component},
	{ path: 'dispatch6', component: Dispatch6Component},
	{ path: 'dispatch7', component: Dispatch7Component},
	{ path: 'dispatch8', component: Dispatch8Component},
	{ path: 'manage', component: ManageComponent},
	{ path: 'settings', component: SettingsComponent},
	{ path: 'stocks-table', component: StocksTableComponent},
	{ path: 'crud-stocks', component: CrudStocksComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
