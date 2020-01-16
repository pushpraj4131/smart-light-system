	import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from '../congif';
@Injectable({
	providedIn: 'root'
})
export class ZoneService {

	constructor(public _http: HttpClient) { }
	getZone(){
		var currentUser = JSON.parse( localStorage.getItem("currentUser"));
		console.log(currentUser.token);
		const headers = new HttpHeaders({'Content-Type':'App/json','Authorization':currentUser.token});

		return this._http.get(  config.baseApiUrl+"findZone" ,{headers: headers});
	}
	getZoneById(zoneId){
		var currentUser = JSON.parse( localStorage.getItem("currentUser"));
		console.log(currentUser.token);
		const headers = new HttpHeaders({'Content-Type':'App/json','Authorization':currentUser.token});

		return this._http.get(  config.baseApiUrl+"findDevices/"+zoneId ,{headers: headers});
	}
	updateDeviceStatus(body , id){
		var currentUser = JSON.parse( localStorage.getItem("currentUser"));
		console.log(currentUser.token);
		const headers = new HttpHeaders({'Content-Type':'application/json','Authorization':currentUser.token});
		console.log("body in servie ====>" , body);
		// return this._http.put("http://132.140.160.114:4000/api/updateDevice/"+id, body , {headers: headers});	
		return this._http.put(  config.baseApiUrl+"updateDevice/"+id , body , {headers: headers});	
	}
}