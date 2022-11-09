import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
    providedIn: 'root'
  })
export class UtilService {

    token : any;

    constructor(private util: HttpClient) { }

    public getToken(){
        this.token = localStorage.getItem('token');
        return this.token;
    }
}