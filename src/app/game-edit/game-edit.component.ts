import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  editForm: FormGroup;  // Define FormGroup to student's edit form


  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message

  ) { }

  ngOnInit(): void {
    this.updateGameData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetGame(id).valueChanges().subscribe(data => {
    this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })

  }

  // Accessing form control using getters
  get title() {
    return this.editForm.get('title');
  }
  get description() {
    return this.editForm.get('description');
  }
  get photo() {
    return this.editForm.get('photo');
  }

   // Contains Reactive Form logic
   updateGameData() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      photo: [''],
    })
  }
  // Go back to previous component
  goBack() {
    this.location.back();
  }

// Below methods fire when somebody click on submit button
updateForm(){
  this.crudApi.UpdateGame(this.editForm.value);       // Update student data using CRUD API
  this.toastr.success(this.editForm.controls['title'].value + ' updated successfully');   // Show succes message when data is successfully submited
  this.router.navigate(['game-list']);               // Navigate to student's list page when student data is updated
}

}
