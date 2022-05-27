import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/interfaces/Hero';
import { AuthenticateService } from '../authenticate.service';
import { HeroService } from '../hero.service';

// create using '$ng generate component hero-detail'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  hero?:Hero;
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  onSave(updatedHero:Hero): void {
    if(this.hero){
      this.heroService.updateHero(updatedHero).subscribe(()=>this.goBack());
    }
  }

  constructor(
    private route: ActivatedRoute, 
    private heroService: HeroService,
    private location: Location,
    private authenticate: AuthenticateService) { }

  ngOnInit(): void { 
    this.authenticate.checkAuthenticate();
    this.getHero(); 
  }

}
