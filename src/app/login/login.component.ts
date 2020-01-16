import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;	
	isDisable: boolean = false;
	error:any;
	constructor(
		public _loginService: LoginService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.error = null;
		if (this._loginService.currentUserValue) { 
			this.router.navigate(['dashboard']);
		}
		this.loginForm = new FormGroup({
			email: new FormControl('' , Validators.required),
			password: new FormControl('' , Validators.required)
		});
	}

	ngOnInit() {

	}
	get f() { return this.loginForm.controls; }
	login(value){
		console.log("value of login credentials " , value);
		this._loginService.login(value).subscribe((res:any)=>{
			console.log(res);
			if(res.message == 'No user found'){
				this.loginForm.reset
				this.error = 'No user found';
			}
			else{
				localStorage.setItem('currentUser', JSON.stringify(res));
				this.error = null;
				// this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
				this.router.navigate(['dashboard']);
			}
		}, (err)=>{
			console.log(err);
		});
	}
}
