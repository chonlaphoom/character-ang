import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  onLogout(): void {
    localStorage.removeItem('authenticated');
    this.router.navigate(['login'])
  }

  onNavSelect(_selected:string): string {
    if(_selected === this.router.url){
      return "background-color: black; color: white;";
    }
    else return "";
  }
}
