import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../services/zone.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	areaName:any /*= [ "First Zone" , "Second Zone" , "Third Zone" , "Fourth Zone" , "HR Zone" , "Entrance Lobby" , "TirthBhai's Office" , "Conference Room" , "Calling Room " , "Ground" , "Ground 1" , "ere"]*/	;

	constructor(
		private _zoneService: ZoneService
	) { }

	ngOnInit() {
		this.getRooms();
	}
	getRooms(){
		this._zoneService.getZone().subscribe((res)=>{
			this.areaName = res;
			console.log("all zone" , res);
		} , (err)=>{
			console.log("err in all zone" , err);
		});
	}
}
