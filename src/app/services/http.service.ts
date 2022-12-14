import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  preRoute = "http://15.206.187.45:8090";
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

    pendingUserList(){
      return this.http.get(this.preRoute+'/admin/pending-member-list');
    }

    requestAction(data : any){
      return this.http.put(this.preRoute+'/admin/request-action', data);
    }

    getUserProfileById(id : any){
       let queryParams = new HttpParams();
      queryParams = queryParams.append("id", id)
      return this.http.post(this.preRoute+'/user/profile',"", {params:queryParams});
    }
}