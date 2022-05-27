import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


export type loginProps = {
  username:string,
  password:string,
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  username:string = '';
  password:string = '';

  @Output() login = new EventEmitter<loginProps>();
  
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log('username in child: ', this.username);
    console.log('password in child: ', this.password);
    this.login.emit({username:this.username, password:this.password});
  }

}
