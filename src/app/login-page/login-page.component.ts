import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { loginProps } from '../login-form/login-form.component';

/**
 *  The purpose of this component, I want to learn about data sharing between child
 *  and parent
 */

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  // properties
  username:string = "";
  password:string = "";

  constructor(private router: Router) { 
  }

  private onValidate = (_user:string,_pass:string):boolean => {
    //static username and password for mock data checking
    const username = 'admin';
    const password = 'admin';
    if(_user !== username || _pass !== password){
      return false;
    }

    // user valid
    return true;
  }

  onLogin(_login:loginProps) {
    this.username = _login.username;
    this.password = _login.password;

    const isValid = this.onValidate(this.username, this.password);

    if(isValid){
      // set localstorage
      localStorage.setItem('authenticated', 'true');

      // redirect
      this.router.navigate([('/dashboard')]);
    }
    
    console.log('username in parent: ', this.username);
    console.log('password in parent: ', this.password);
  }

  ngOnInit(): void {

  }

}
