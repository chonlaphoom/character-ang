import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private router:Router) { }

  checkAuthenticate() {
    const isValid = localStorage.getItem('authenticated') === 'true';
    if(!isValid){
      //redirect to login cause user is not valid;
      this.router.navigate(['login']);
    }
  }
}
