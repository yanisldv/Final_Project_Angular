import { Component } from '@angular/core';
import { Flashcard } from './flashcard.model';
import { LessonDataService } from './lesson-data.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
  showAnswer = false;
  flashcards: Flashcard[] = [];

  currentFlashcardIndex: number = 0;
  evaluationMessage: string | null = null;

  constructor(private lessonDataService: LessonDataService) {}

  ngOnInit() {
    this.lessonDataService.getLessonData().subscribe(data => {
      this.flashcards = data;
    });
  }

  get currentFlashcard(): Flashcard {
    return this.flashcards[this.currentFlashcardIndex];
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  nextFlashcard() {
    this.currentFlashcardIndex = (this.currentFlashcardIndex + 1) % this.flashcards.length;
    this.showAnswer = false;
    this.evaluationMessage = null;
  }

  evaluateQuestion(evaluation: string) {
    this.evaluationMessage = `Vous avez choisi : ${evaluation}`;
    this.nextFlashcard();
  }
}
