import { Injectable } from '@angular/core';
import { HEROES } from 'src/data/Heroes';
import { Hero } from 'src/interfaces/Hero';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** @deprecated use in-memory-data service instead*/
  getMockHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    return heroes;
  }

  /** @deprecated use in-memory-data service instead*/
  getHero(id: number): Observable<Hero> {
    const selectedHero = HEROES.find(hero => hero.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${selectedHero.id}`);
    return of(selectedHero);
  }

  getHeroById(id: number): Observable<Hero> {
    const hero = this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero by id ${id}`)),
        catchError(this.handleError<Hero>(`getHeroById id=${id}`))
      );

    return hero;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateHero(updatedHero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, updatedHero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${updatedHero.id}`)),
        catchError(this.handleError<any>('updayeHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: any) => this.log(`added hero with new id= ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`delete hero id = ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
