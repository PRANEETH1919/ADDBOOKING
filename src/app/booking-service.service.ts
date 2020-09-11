import { Injectable } from '@angular/core';
import { BookingForm } from './booking-form';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  flag=false;
  constructor(private http: HttpClient) { }

    public addbooking(bookingfrm:BookingForm):Observable<any> {
      let utoken = localStorage.getItem("token");
      if(utoken==null)utoken="";
      const httpHeaders = new HttpHeaders({"userId": utoken});
      console.log(utoken);
      return this.http.post("http://localhost:8082/springrest/addbooking/",bookingfrm,{headers:httpHeaders});
    }
  decrypt(token:string){
    let str="";
    for(let i=0;i<token.length;i++){
      str=str + String.fromCharCode(token.charCodeAt(i)-3);
    }
    console.log(str);
    return str;
  }
  encrypt(token:string){
    let str="";
    for(let i=0;i<token.length;i++){
      str=str + String.fromCharCode(token.charCodeAt(i)+3);
    }
    return str;
  }
  public doLogin(userId:string,pwd:string):Observable<any>{
    let postData=new FormData();
    postData.append('userid',userId);
    postData.append('password',this.encrypt(pwd));
    return this.http.post("http://localhost:8082/springrest/login",postData,{responseType:'text'});
  }
  public doLogout(){
    this.flag=true;
    let utoken=localStorage.getItem("token");
    if(utoken==null)utoken="";
    const httpHeaders = new HttpHeaders({"Userid":utoken});
    return this.http.get("http://localhost:8082/springrest/logout",{headers:httpHeaders,responseType:'text'});
  }
}