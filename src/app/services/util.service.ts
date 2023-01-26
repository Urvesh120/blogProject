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
    message = new Subject<string>();
    messageType = new Subject<messages>();
    displayMessage !: boolean ;

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

    public setMessage(message : any, type : messages){
        this.message.next(message);
        this.messageType.next(type);
    }

    public getMessage() : Observable<string>{
        return this.message.asObservable();
    }
    
    public getMessageType() : Observable<messages>{
        return this.messageType.asObservable();
    }

    public setShowMessage( display : boolean){
        this.displayMessage = display;
    }

    public getShowMessage(){
        return this.displayMessage;
    }
}