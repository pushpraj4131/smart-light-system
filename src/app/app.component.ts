import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	userInfo = JSON.parse(localStorage.getItem("currentUser"));	
	title = 'smart-lighting-system';
	constructor(private route: ActivatedRoute,
	private router: Router, private loginService: LoginService) {
		this.loginService.isLoggedIn.subscribe((data) => {
			if(data === 'loggedIn') {
				this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			}
		});
	}
	ngOnInit() {
		console.log(" app called");
		if(!this.userInfo){
			this.router.navigate(['']);
		}else{
			console.log("called 2nd time");
			console.log(this.userInfo);
			this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			// this.router.navigate(['/dashboard']);
		}
		

	}
	logout() {
		console.log("logiut ccalled");
		localStorage.removeItem('currentUser');
		this.userInfo = null;
		this.loginService.logout();
		this.router.navigate(['']);
	}
}
