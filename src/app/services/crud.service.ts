import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
export interface Game {
  $key: string;
  title: string;
  description: string;
  photo: string;
}
@Injectable({
providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  gamesRef: AngularFireList<any>;    // Reference to Game data list, its an Observable
  gameRef: AngularFireObject<any>;   // Reference to Game object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor

  constructor(private db: AngularFireDatabase) { }

    // Create Game
    AddGame(game: Game) {
      this.gamesRef.push({
        title: game.title,
        description: game.description,
        photo: game.photo
      })
    }
  
 // Fetch Single Game Object
 GetGame(id: string) {
  this.gameRef = this.db.object('games-list/' + id);
  return this.gameRef;
}

 // Fetch Games List
 GetGamesList() {
  this.gamesRef = this.db.list('games-list');
  return this.gamesRef;
}  

  // Update Game Object
  UpdateGame(game: Game) {
    this.gameRef.update({
      title: game.title,
      description: game.description,
      photo: game.photo
    })
  }  

    // Delete Game Object
    DeleteGame(id: string) { 
      this.gameRef = this.db.object('games-list/'+id);
      this.gameRef.remove();
    }

}
