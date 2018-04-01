import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';
import { DispatchComponent } from './components/dispatch/dispatch.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ManageComponent } from './components/manage/manage.component';
import { CrudStocksComponent } from './components/crud-stocks/crud-stocks.component';

export const router: Routes = [
	{ path: '', redirectTo: 'dispatch', pathMatch: 'full'},
	{ path: 'dispatch', component: DispatchComponent},
	{ path: 'manage', component: ManageComponent},
	{ path: 'settings', component: SettingsComponent},
	{ path: 'stocks-table', component: StocksTableComponent},
	{ path: 'crud-stocks', component: CrudStocksComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
