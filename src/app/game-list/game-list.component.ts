import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';  
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

export interface Game {
  $key: string;
  title: string;
  description: string;
  photo: string;
}

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  p: number = 1;                      // Settup up pagination variable
  Game: Game[];                 // Save games data in game's array.
  hideWhenNoGame: boolean = false; // Hide games data table when no game.
  noData: boolean = false;            // Showing no game Message, when no game in database.

  constructor(
    public crudApi: CrudService, // Inject game CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }

  ngOnInit(): void {
    this.dataState(); // Initialize game's list, when component is ready
    let s = this.crudApi.GetGamesList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Game = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Game.push(a as Game);
      })
    })
  }
  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetGamesList().valueChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.hideWhenNoGame = false;
        this.noData = true;
      } else {
        this.hideWhenNoGame = true;
        this.noData = false;
      }
    })
  }
  // Method to delete student object
  deleteGame(game) {
    if (window.confirm('Are sure you want to delete this game ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteGame(game.$key) // Using Delete game API to delete game.
      this.toastr.success(game.title + ' successfully deleted!'); // Alert message will show up when game successfully deleted.
    }
  }


}
