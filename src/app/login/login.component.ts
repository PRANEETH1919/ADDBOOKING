import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storageservice';
import { BookingServiceService } from '../booking-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
uname:string;
pwd:string;
msg:string
  constructor(private router:Router,private storageService:StorageService,private bservice:BookingServiceService) { }

  ngOnInit(): void { }
doLogin(){
  this.bservice.doLogin(this.uname,this.pwd).subscribe(data=>{this.storageService.setItem("tokenId",data);
this.msg=undefined;console.log(data);
this.router.navigateByUrl("/");
},
error=>{this.msg="Invalid Credentials";console.log(error)});
}
}
