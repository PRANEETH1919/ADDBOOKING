import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingServiceService } from '../booking-service.service';
import { BookingForm } from '../booking-form';
import { Passenger } from '../passenger';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {
    bookForm= new BookingForm();

  showFlag: boolean;
  msg: any;
  errorMsg: any;
  @ViewChild('frm')
  form:NgForm

    constructor(private bookingService:BookingServiceService,private route:ActivatedRoute) { }

    ngOnInit() {
    //  this.route.paramMap.subscribe(params=>{let scheduleFlightId=params.get('scheduleFlightId');
   // this.bookForm.contactNo=scheduleFlightId});
  
    }
 
    bookFlight(){
      this.bookingService.addbooking(this.bookForm).subscribe(data=>{this.msg=data.message;console.log(data);
      this.form.resetForm();this.showFlag=false;this.errorMsg=undefined},
      error=>{this.errorMsg=error.error.message;this.msg=undefined;console.log(error);
      }
      )

    }

  displayrows(){
    this.bookForm.passengers=[];
    if(this.bookForm.tkts>0 && this.bookForm.tkts<=5){
    for(let idx=0;idx<this.bookForm.tkts;++idx){
      this.bookForm.passengers.push(new Passenger());
    }
  }
  }
}
