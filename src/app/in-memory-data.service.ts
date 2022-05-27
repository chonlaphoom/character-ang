import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from 'src/interfaces/Hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Sword man' },
      { id: 12, name: 'Archer' },
      { id: 13, name: 'Necromancer' },
      { id: 14, name: 'Merchant' },
      { id: 15, name: 'Theif' },
      { id: 16, name: 'Wizard' },
      { id: 17, name: 'Warrior' },
      { id: 18, name: 'Monk' },
      { id: 19, name: 'Skeleton' },
      { id: 20, name: 'unknown' }
    ]
    return {heroes};
  }

  // generate hero id in-case hero has no id from updating data
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

}
