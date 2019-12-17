import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase , AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { ZoneService } from '../services/zone.service';
import * as firebase from "firebase";
@Component({
	selector: 'app-zone-details',
	templateUrl: './zone-details.component.html',
	styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {
	userInfo:any;
	userId:any;
	deviceInfo:any;
	fireBaseData;
	zoneUniqueId:any;
	rootRef = firebase.database();
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _zoneService: ZoneService,
		public _angularFirebaseDB: AngularFireDatabase

	) { 
		this.userInfo =  JSON.parse( localStorage.getItem("currentUser"));
		this.userId = this._activatedRoute.snapshot.paramMap.get('zoneId');
		this.zoneUniqueId = this._activatedRoute.snapshot.paramMap.get('zoneUniqueId');
		console.log(this.userId , this.zoneUniqueId);
	}

	ngOnInit() {
		this.getZoneById();
		
		
	}
	getZoneById(){
		this._zoneService.getZoneById(this.userId).subscribe((res)=>{
			this.deviceInfo = res;
			console.log(res);
		},(err)=>{
			console.log(err)
		})
	}
	changeEvent(event , id){
		if(event.currentTarget.checked == true){
			var lightStatus = "on"
			// event.currentTarget.checked = 
		}else{
			var lightStatus = "off"
		}
		var body = {
			"state" : lightStatus,
		}
		console.log("id ==>" , id);
		id = id.toString();
		var obj = {
			[id] : lightStatus
		}
		console.log("Body " , body);
		this.rootRef.ref(this.zoneUniqueId).update(obj);
		console.log("event ===>" , event.currentTarget.checked ,"==++>" ,id);
		this._zoneService.updateDeviceStatus(body , id).subscribe((res)=>{
			console.log("res of updated devcice" , res);
		} , (err)=>{
			console.log("err of updated devcice" , err);
		});
	}
}
