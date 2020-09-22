import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  public gameForm: FormGroup;  // Define FormGroup to game's form



  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

  ngOnInit(): void {

    this.crudApi.GetGamesList();  // Call GetGamesList() before main form is being called
    this.gamesForm(); // Call game form when component is ready
    // this.gameForm = new FormGroup({title: new FormControl(), description: new FormControl(), photo: new FormControl()});
  }

    // Reactive game form
    gamesForm() {
      this.gameForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        description: [''],
        photo: ['']
      })  
    }
    // Accessing form control using getters
    get title() {
      return this.gameForm.get('title');
    }
    get description() {
      return this.gameForm.get('description');
    }  
    get photo() {
      return this.gameForm.get('photo');
    }

    // Reset game form's values
    ResetForm() {
      this.gameForm.reset();
    }  
   
    submitGameData() {
      this.crudApi.AddGame(this.gameForm.value); // Submit game data using CRUD API
      this.toastr.success(this.gameForm.controls['title'].value + ' successfully added!'); // Show success message when data is successfully submited
      this.ResetForm();  // Reset form when clicked on reset button
     };
  
  
}
