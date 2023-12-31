import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonEditFormComponent} from "./lesson-edit-form/lesson-edit-form.component";
import {FlashcardComponent} from "./flashcard/flashcard.component";
import {LandingPageComponent} from "./landing-page/landing-page.component"
import {FlashcardsPageComponent} from "./flashcards-page/flashcards-page.component"
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path:'lesson-edit-form', component: LessonEditFormComponent },
  { path:'flashcard', component: FlashcardComponent },
  { path: 'revision', component: LandingPageComponent },
  { path: 'flashcards/:matiere', component: FlashcardsPageComponent },
  { path:'', component: HomepageComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
