import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DspComponent } from './components/dsp/dsp.component';
import { DspmComponent } from './components/dspm/dspm.component';
import { DspcComponent } from './components/dspc/dspc.component';

export const router: Routes = [
	{ path: '', redirectTo: 'dispatch', pathMatch: 'full'},
	{ path: 'dispatch', component: DspComponent},
	{ path: 'manage', component: DspmComponent},
	{ path: 'settings', component: DspcComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
