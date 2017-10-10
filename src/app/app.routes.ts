import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { ListComponent } from './list/list.component';
import { DispatchComponent } from './dispatch/dispatch.component';

export const router: Routes = [
	{ path: '', redirectTo: 'dispatch', pathMatch: 'full'},
	{ path: 'dispatch', component: DispatchComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);