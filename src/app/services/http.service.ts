import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
    constructor( private http: HttpClient,private httpWithoutInterceptor:HttpClient, private httpbackend:HttpBackend ){
        this.httpWithoutInterceptor= new HttpClient(httpbackend);
    }

    login(loginCredential : any){
      return this.http.post(environment.apiUrl+'/user/login', loginCredential);
    }

    register(registerCredential : any){
      return this.http.post(environment.apiUrl+'/user/login', registerCredential);
    }
}