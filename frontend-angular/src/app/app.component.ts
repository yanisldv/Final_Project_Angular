// app.component.ts
import { Component, OnInit } from '@angular/core';
import { LessonDataService } from './flashcard/lesson-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private lessonDataService: LessonDataService) {}

  ngOnInit(): void {
    // Appeler loadDefaultFlashcards au démarrage de l'application
    this.lessonDataService.loadDefaultFlashcards();
  }
}
