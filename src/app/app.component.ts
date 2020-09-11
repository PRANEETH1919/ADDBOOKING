import { Component } from '@angular/core';
import { BookingServiceService } from './booking-service.service';
import { Router } from '@angular/router';
import { StorageService } from './storageservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'addBooking';
  msg:string;
  errorMsg:string;
  loginflag:boolean=false;
  //login:Login=new Login();
  userName:string;
  role:string;
  constructor(private bservice:BookingServiceService,private router:Router,private storageService:StorageService){
    if(localStorage.getItem("tokenId")!=null){
      let userstr=localStorage.getItem("tokenId");
      console.log(userstr.split("-")[1]);
      this.userName=this.bservice.decrypt(userstr.split("-")[1]);
      this.loginflag=true;
      this.role=this.bservice.decrypt(userstr.split("-")[2]);
    }
  }
  ngOnInit():void{
    this.storageService.watchStorage().subscribe(data=>{
      console.log(data);
      if( data=="set"){
        this.loginflag=true;
        let userstr=localStorage.getItem("tokenId");
        console.log(userstr.split("-")[2]);
        this.userName=this.bservice.decrypt(userstr.split("-")[1]);
      }
      else
      this.loginflag=false;
    });
  }
  logout():void{
   // this.fservice.doLogout().subscribe(data=>{
      //console.log(data);
      this.storageService.removeItem("tokenId");
      alert("You have logged out");
      this.loginflag=false;
      this.router.navigateByUrl("/");
   // });
  }
}
