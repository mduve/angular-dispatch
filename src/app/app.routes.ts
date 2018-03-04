import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
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

export const router: Routes = [
	{ path: '', redirectTo: 'dispatch', pathMatch: 'full'},
	{ path: 'dispatch', component: DispatchComponent},
	{ path: 'dispatch1', component: Dispatch1Component},
	{ path: 'dispatch2', component: Dispatch2Component},
	{ path: 'dispatch3', component: Dispatch3Component},
	{ path: 'dispatch4', component: Dispatch4Component},
	{ path: 'dispatch5', component: Dispatch5Component},
	{ path: 'fcSearch', component: FcSearchComponent},
	{ path: 'manage', component: ManageComponent},
	{ path: 'settings', component: SettingsComponent},
	{ path: 'stocks-table', component: StocksTableComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
