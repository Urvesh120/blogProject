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
      return this.httpWithoutInterceptor.post(this.preRoute+'/user/login', loginCredential);
    }

    register(registerCredential : any){
      return this.httpWithoutInterceptor.post(this.preRoute+'/user/register', registerCredential);
    }

    userlist(){
      return this.http.get(this.preRoute+'/user/member-list');
    }

    pendungUserList(){
      return this.http.get(this.preRoute+'/admin/pending-member-list');
    }

    requestAction(data : any){
      debugger
      this.http.put(this.preRoute+'/admin/request-action', data);
    }
}