import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppModuleModule } from './app.module/app.module.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LessonEditFormComponent } from './lesson-edit-form/lesson-edit-form.component';
import { MenuNavBarComponent } from './menu-nav-bar/menu-nav-bar.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { LessonDataService } from './flashcard/lesson-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FlashcardsPageComponent } from './flashcards-page/flashcards-page.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    LessonEditFormComponent,
    MenuNavBarComponent,
    FlashcardComponent,
    LandingPageComponent,
    FlashcardsPageComponent,
    HomeComponent,

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdown,
    HttpClientModule,
  ],
  providers: [LessonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
