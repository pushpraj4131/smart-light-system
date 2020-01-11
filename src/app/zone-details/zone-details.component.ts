import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ZoneService } from '../services/zone.service';
import * as firebase from "firebase";
@Component({
	selector: 'app-zone-details',
	templateUrl: './zone-details.component.html',
	styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {
	userInfo: any;
	userId: any;
	deviceInfo = [];
	fireBaseData;
	zoneUniqueId: any;
	rootRef = firebase.database();
	snapValue: any;
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _zoneService: ZoneService,
		public _angularFirebaseDB: AngularFireDatabase,
		private change: ChangeDetectorRef
	) {
		this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
		_activatedRoute.params.subscribe(async (params: any) => {
			this.userId = params.zoneId;
			this.zoneUniqueId = params.zoneUniqueId;
			await this.getZoneById();
		})
		console.log(this.userId, this.zoneUniqueId);
	}

	ngOnInit() {
		// this.getZoneById();
	}
	getZoneById() {
		this._zoneService.getZoneById(this.userId).subscribe((res: any) => {
			this.deviceInfo = res;
			let starCountRef = this.rootRef.ref(this.zoneUniqueId);
			starCountRef.on('value', (snapshot) => {
				if (this.deviceInfo) {
					this.deviceInfo.map((device, index) => {
						for (let [key, value] of Object.entries(snapshot.val())) {
							if (device.device_id === key) {
								this.deviceInfo[index].state = value;
							}
						}
					});
				}
				this.change.detectChanges();
			});
		}, (err) => {
			console.log(err)
		})
	}

	getSwitchState(device) {
		return device.state === 'off' ? false : true;
	}
	changeEvent(event, id) {
		if (event.currentTarget.checked == true) {
			var lightStatus = "on"
		} else {
			var lightStatus = "off"
		}
		var body = {
			"state": lightStatus,
		}
		id = id.toString();
		var obj = {
			[id]: lightStatus
		}
		this.rootRef.ref(this.zoneUniqueId).update(obj);
		this._zoneService.updateDeviceStatus(body, id).subscribe((res) => {
			console.log(res);
		}, (err) => {
			console.log("err of updated devcice", err);
		});
	}
	updateStarCount(abc, acc) {
		console.log("acc", acc);
	}
}
