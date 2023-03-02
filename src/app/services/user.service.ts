import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// The @Injectable() decorator is used to indicate that this class is the injectable service.
// The providedIn property of the @Injectable() decorator specifies the scope for Angular's dependency injection system. 
// Here we set it to 'root' so the service will be available in our entire application.

@Injectable({
  providedIn: 'root'
})

// We define an httpUrl which we get from the environment file so that it can be used later when we make API requests.
// The signup() method uses the HttpClient object to make an API call with the provided data and sets the header type as application/json.

export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  signup(data:any){
    return this.httpClient.post(this.url+
      "/user/signup",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }
}
