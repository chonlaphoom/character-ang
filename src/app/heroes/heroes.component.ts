import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from 'src/interfaces/Hero';
import { MessageService } from '../message.service';
import { AuthenticateService } from '../authenticate.service';

const template1:string = `
<h2>{{hero.name | uppercase}} Details</h2>
<div><span> id: {{hero.id}} </span></div>
<div><span> name: {{hero.name}} </span></div>
`;

const template2:string = `
<div>
    <label for="name">Hero name: </label>
    <input id="name" [(ngModel)]="hero.name" placeholder="name">
</div>
`;

const template3:string = `
<app-header></app-header>
<h2>character list</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
`;

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.template.html',
    styleUrls: ['./heroes.style.css']
})

export class HeroesCompoent implements OnInit {
    
    // data
    heroes:Hero[] = [];
    
    // selected
    selectedHero?:Hero;
    
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
        this.messageService.add(`HeroesComponent: Selected Hero id = ${hero.id}`);
    }

    add(name:string):void {
        name = name.trim();
        if(!name) {
            return;
        }

        this.heroService.addHero({name} as Hero).subscribe(hero => {
            this.heroes.push(hero);
        });
    }

    getHeroes(): void {
        /* 
            this fetch hero data and also set to 'heroes' property
            which is not single responsibility
        */     
         this.heroService.getHeroes().subscribe(res => {
            this.heroes = res;
        });
    }

    constructor(
        private heroService: HeroService
        , private messageService: MessageService
        , private authenticateService: AuthenticateService){

    }

    delete(target:Hero):void {
        console.log('target', target);
        this.heroService.deleteHero(target.id).subscribe(_ => {
            this.heroes = this.heroes.filter(h => h.id !== target.id)
        });
    }

    ngOnInit(): void {
        this.authenticateService.checkAuthenticate();
        this.getHeroes();
    }
}