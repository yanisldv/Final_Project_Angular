// flashcards-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonDataService } from '../flashcard/lesson-data.service';
import { Flashcard } from '../flashcard/flashcard.model';

@Component({
  selector: 'app-flashcards-page',
  templateUrl: './flashcards-page.component.html',
  styleUrls: ['./flashcards-page.component.css']
})
export class FlashcardsPageComponent implements OnInit {
  showAnswer = false;
  flashcards: Flashcard[] = [];
  currentFlashcardIndex: number = 0;
  evaluationMessage: string | null = null;
  totalFlashcardsVisited: number = 0;
  
  

  constructor(
    private lessonDataService: LessonDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Souscrire aux changements dans les paramètres de la route
    this.route.queryParams.subscribe(params => {
      // Récupérer le nombre de flashcards du paramètre de requête
      const numberOfFlashcards = +params['numberOfFlashcards'] || 0;

      // Récupérer la matière de la route
      const matiere = this.route.snapshot.params['matiere'];

      // Charger les flashcards de la matière
      if (matiere) {
        this.lessonDataService.getFlashcardsByMatiere(matiere).subscribe(data => {
          // Utiliser numberOfFlashcards pour charger le bon nombre de flashcards
          this.flashcards = this.loadFlashcards(data, numberOfFlashcards);
        });
      }
    });

    // Récupérer le nombre total de flashcards visitées depuis LocalStorage
    const totalVisited = localStorage.getItem('totalFlashcardsVisited');
    this.totalFlashcardsVisited = totalVisited ? +totalVisited : 0;
  }
  
  fillFlashcardsArray(allFlashcards: Flashcard[], numberOfFlashcards: number): Flashcard[] {
    const filledFlashcardsArray: Flashcard[] = [];
  
    // Assurez-vous que numberOfFlashcards est un nombre positif
    numberOfFlashcards = Math.max(0, numberOfFlashcards);
  
    // Remplir le tableau avec les flashcards existantes en alternance
    for (let i = 0; i < numberOfFlashcards; i++) {
      const flashcardIndex = i % allFlashcards.length;
      filledFlashcardsArray.push(allFlashcards[flashcardIndex]);
    }
  
    return filledFlashcardsArray;
  }


  get currentFlashcard(): Flashcard {
    return this.flashcards[this.currentFlashcardIndex];
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  nextFlashcard() {
    // Incrémentez l'index de la flashcard actuelle
    this.totalFlashcardsVisited++;
    localStorage.setItem('totalFlashcardsVisited', this.totalFlashcardsVisited.toString());

    this.currentFlashcardIndex = (this.currentFlashcardIndex + 1) % this.flashcards.length;
    console.log(this.currentFlashcardIndex);
  
    // Vérifiez si le nombre de flashcards évaluées atteint le nombre spécifié
    if (this.currentFlashcardIndex === 0) {
      // Si oui, réinitialisez l'index et mélangez la liste des flashcards
      
    }
  
    // Masquez la réponse et réinitialisez le message d'évaluation
    this.showAnswer = false;
  }

  evaluateQuestion(evaluation: string) {
    // Get the current flashcard
    const currentFlashcard = this.currentFlashcard;
  
    // Log the current index and flashcards before modification
    console.log('Before:');
    console.log('Current Index:', this.currentFlashcardIndex);
    console.log('Flashcards:', this.flashcards);
  
    // Remove the current flashcard from the array if the evaluation is 'easy'
    if (evaluation === 'easy') {
      this.flashcards = this.flashcards.filter(card => card !== currentFlashcard);
    }
  
    // If the evaluation is 'hard', add the current flashcard after the current index
    if (evaluation === 'hard') {
      const currentIndex = this.currentFlashcardIndex;
      this.flashcards = [
        ...this.flashcards.slice(0, currentIndex + 1),
        currentFlashcard,
        ...this.flashcards.slice(currentIndex + 1)
      ];
  
      // Update the current index
      this.currentFlashcardIndex = (currentIndex + 1) % this.flashcards.length;
    }
  
    // Log the current index and flashcards after modification
    console.log('After:');
    console.log('Current Index:', this.currentFlashcardIndex);
    console.log('Flashcards:', this.flashcards);
    if (this.flashcards.length === 0) {
      console.log("zeroooooooo")
      this.evaluationMessage = 'Bravo ! Vous avez réussi votre série. Consultez le menu pour ajouter des flashcards ou sentrainer';
      console.log(this.evaluationMessage)
    } else {
      // Call nextFlashcard to handle the logic of moving to the next flashcard
      this.nextFlashcard();
    }
  }
  
  
  
  
  
 
  
  loadFlashcards(allFlashcards: Flashcard[], numberOfFlashcards: number): Flashcard[] {
    // Assurez-vous que numberOfFlashcards est un nombre positif
    numberOfFlashcards = Math.max(0, numberOfFlashcards);
  
    // Utilisez la méthode slice pour extraire les premières numberOfFlashcards flashcards
    return allFlashcards.slice(0, numberOfFlashcards);
  }
}
