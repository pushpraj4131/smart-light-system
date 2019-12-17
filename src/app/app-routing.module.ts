import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'zone-details/:zoneId/:zoneUniqueId',
		component: ZoneDetailsComponent
	}	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
