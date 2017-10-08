import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ReviewComponent } from './review/review.component';

export const router: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full'},
	{ path: 'list', component: ListComponent},
	{ path: 'review', component: ReviewComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);