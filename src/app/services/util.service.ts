import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { messages } from '../shared/enum';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UtilService {

    token : any;
    userLogedIn : any;
    id = new BehaviorSubject<string>("");
    userType = new BehaviorSubject<string>("");

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

    public setId(id : string){
        this.id.next(id);
    }

    public getId(){
        return this.id.asObservable();
    }

    public setUserType(type : string){
        this.userType.next(type);
    }

    public getUserType(){
        return this.userType.asObservable();
    }
}