import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root'
  })
export class UtilService {

    token : any;
    userLogedIn : any;

    constructor(private util: HttpClient) { }

    public getToken(){
        this.token = localStorage.getItem('token');
        return this.token;
    }

    public isLogedIn(){
        this.userLogedIn = localStorage.getItem('userEmailId');
        if(!!this.userLogedIn){
            return true;
        }
        else{
            return false;
        }
    }

    public previouslyLogedIn(){
        return localStorage.getItem('logout');
    }
}