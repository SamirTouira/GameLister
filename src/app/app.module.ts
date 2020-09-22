import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCreateComponent } from './game-create/game-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameListComponent } from './game-list/game-list.component';

// Routes array define component along with the path name for url
const routes: Routes = [
  { path: '', redirectTo: '/game-list', pathMatch: 'full' },
  { path: 'register-game', component: GameCreateComponent },
  { path: 'game-list', component: GameListComponent },
  { path: 'game-edit/:id', component: GameEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GameCreateComponent,
    NavbarComponent,
    HeaderComponent,
    GameEditComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
