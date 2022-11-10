import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  preRoute = "http://ec2-54-242-17-125.compute-1.amazonaws.com:8090";

    constructor( private http: HttpClient,private httpWithoutInterceptor:HttpClient, private httpbackend:HttpBackend ){
        this.httpWithoutInterceptor= new HttpClient(httpbackend);
    }

    login(loginCredential : any){
      return this.http.post(this.preRoute+'/user/login', loginCredential);
    }

    register(registerCredential : any){
      return this.http.post(this.preRoute+'/user/login', registerCredential);
    }
}