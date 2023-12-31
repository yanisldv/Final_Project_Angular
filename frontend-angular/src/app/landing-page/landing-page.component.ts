// landing-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LessonDataService } from '../flashcard/lesson-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  matieres: string[] = ['Mathematiques', 'Physique', 'SVT','Histoire'];
  selectedMatiere: string = '';
  selectedNumberOfFlashcards: number = 10;
  availableNumberOfFlashcards: number[] = [10, 20, 30];
  constructor(private lessonDataService: LessonDataService, private router: Router) {}


  redirectToFlashcards(): void {
    if (this.selectedMatiere) {
      // Vérifiez si le nombre de flashcards demandé est disponible
      const numberOfFlashcards = Math.min(
        this.selectedNumberOfFlashcards,
        this.availableNumberOfFlashcards.reduce((a, b) => Math.max(a, b), 0)
      );

      // Naviguez vers la page des flashcards avec les paramètres appropriés
      this.router.navigate(['/flashcards', this.selectedMatiere], {
        queryParams: { numberOfFlashcards: numberOfFlashcards }
      });
    }
  }
}
