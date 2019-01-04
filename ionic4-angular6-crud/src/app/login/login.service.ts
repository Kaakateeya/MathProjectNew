import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs'
import { Injectable } from '@angular/core';
import {IMathQuill, MathQuillLoader} from 'mathquill-typescript';
const apiUrl = "http://api.zippopotam.us/";
import 'rxjs';
import { map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  data:any;
  mqpromise: Promise<IMathQuill>;
  constructor(public http: HttpClient) {  
    this.mqpromise = new Promise(resolve => { 
      let optionat:any ={};
      optionat.mode='.min';
      MathQuillLoader.loadMathQuill({}, (mq: IMathQuill) => {
        resolve(mq);
      });
    });
  
  }
  
  getData(): Observable<any> {
    let response1 = this.http.get(apiUrl+'US/00210');
    let response2= this.http.get(apiUrl+'IN/110001');
    let response3 = this.http.get(apiUrl+'BR/01000-000');
    let response4 = this.http.get(apiUrl+'FR/01000');
    return forkJoin([response1, response2, response3, response4]);
  }
  getPracticeData(obj):Observable<any> {
         return this.http.post('http://dev.thirdleap.ai/api/v1/get-next-question',obj).pipe(map((res: Response) => this.data = res));;
  }

  
}
