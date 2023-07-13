import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {

  preRoute = environment.apiURL;
    constructor( private http: HttpClient,private httpWithoutInterceptor:HttpClient, private httpbackend:HttpBackend ){
        this.httpWithoutInterceptor= new HttpClient(httpbackend);
    }

    login(loginCredential : any){
      return this.httpWithoutInterceptor.post(this.preRoute+'/user/login', loginCredential);
    }

    register(registerCredential : any){
      return this.httpWithoutInterceptor.post(this.preRoute+'/user/register', registerCredential);
    }
    
    updateprofile(updatedCredential : any){
      return this.http.put(this.preRoute+'/user/update', updatedCredential);
    }

    adminUserlist(){
      return this.http.get(this.preRoute+'/admin/member-list');
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

    forgotPassword(data:any){
      return this.httpWithoutInterceptor.post<any>(this.preRoute+'/user/forgot-password', data)
    }

    verifyResetPasswordToken(token: any){
      return this.httpWithoutInterceptor.get<any>(`${this.preRoute}/user/verify-token?token=${token}`)
    }
    
    resetPassword(data: any){
      return this.httpWithoutInterceptor.post<any>(this.preRoute+'/user/reset-password', data);
    }

    currentDayBirthday(){
      return this.httpWithoutInterceptor.get(this.preRoute+'/user/birthday');
    }
}