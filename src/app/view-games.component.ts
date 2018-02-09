import { Component } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Game } from './Game';
import { environment } from 'environments/environment';
import { MomentModule } from 'angular2-moment';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view-games',
  templateUrl: './view-games.component.html',
  styleUrls: ['./view-games.component.css']
})

export class Games{
  private games: Game[] = [];
  myDate:Date;
  environmentName = environment.environment;
  constructor(private http: Http ) {    
    this.myDate = new Date();
    let URI = environment.api_url || `/api/games/`;
    http.get(URI)
      .map(res => res.json()) 
      .subscribe(games => this.games = games); 
    }
  }
