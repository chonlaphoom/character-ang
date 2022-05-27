import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/interfaces/Hero';
import { AuthenticateService } from '../authenticate.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  heroes:Hero[] = [];

  constructor(
    private heroService : HeroService,
    private authenticate : AuthenticateService
    ) { }

  getHeroes():void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes.slice(0,4)
    );
  }

  ngOnInit(): void {
    this.authenticate.checkAuthenticate();
    this.getHeroes();
  }

}
