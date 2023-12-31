// lesson-edit-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flashcard } from '../flashcard/flashcard.model';
import { LessonDataService } from '../flashcard/lesson-data.service';

@Component({
  selector: 'app-lesson-edit-form',
  templateUrl: './lesson-edit-form.component.html',
  styleUrls: ['./lesson-edit-form.component.css']
})
export class LessonEditFormComponent {
  flashcardForm: FormGroup;
  firstFlashcardAnswer: string | null = null;
  matieres: string[] = ['Mathematiques', 'Physique', 'SVT','Histoire'];


  constructor(private formBuilder: FormBuilder, public lessonDataService: LessonDataService) {
    this.flashcardForm = this.formBuilder.group({
      matiere: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadFirstFlashcardAnswer();
  }

  addFlashcard() {
    if (this.flashcardForm.valid) {
      const newFlashcard: Flashcard = {
        matiere: this.flashcardForm.value.matiere,
        question: this.flashcardForm.value.question,
        answer: this.flashcardForm.value.answer,
        frequency : 1
      };

      this.lessonDataService.addFlashcard(newFlashcard).subscribe(
        // Réussite de l'ajout
        (addedFlashcard) => {
          console.log('Flashcard ajoutée avec succès', addedFlashcard);
          this.flashcardForm.reset();
        },
        // Gestion d'erreur
        (error) => {
          console.error('Erreur lors de l\'ajout de la flashcard', error);
        }
      );
    }
  }
  loadFirstFlashcardAnswer(): void {
    this.lessonDataService.getLessonData().subscribe(
      (flashcards) => {
        if (flashcards && flashcards.length > 0) {
          this.firstFlashcardAnswer = flashcards[0].answer;
        } else {
          this.firstFlashcardAnswer = 'Aucune flashcard disponible';
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de la première flashcard', error);
        this.firstFlashcardAnswer = 'Erreur lors du chargement';
      }
    );
  }
}
