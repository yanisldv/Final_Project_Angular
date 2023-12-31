// lesson-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from './flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class LessonDataService {
  private apiUrl = 'http://localhost:5000/api/flashcards';

  constructor(private http: HttpClient) {}

  getLessonData(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(this.apiUrl);
  }

  addFlashcard(flashcard: Flashcard): Observable<Flashcard> {
    return this.http.post<Flashcard>(this.apiUrl, flashcard);
  }

  getSize(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
  getDistinctMatieres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/distinct-matieres`);
  }
  getFlashcardsByMatiere(matiere: string): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/${matiere}`);
  }
  loadDefaultFlashcards(): void {
    // Ajoutez vos flashcards initiales en utilisant la fonction addFlashcard
    const defaultFlashcards: Flashcard[] = [
      { matiere: 'Mathematique', question: 'Quelle est la formule de la somme des angles d\'un triangle ?', answer: 'La somme des angles d\'un triangle est égale à 180 degrés.',frequency:1 },
      { matiere: 'Mathematique', question: 'Qu\'est-ce qu\'une équation quadratique ?', answer: 'Une équation quadratique est une équation polynomiale du second degré.',frequency:1 },
      { matiere: 'Mathematique', question: 'Quel est le théorème de Pythagore ?', answer: 'Le théorème de Pythagore énonce que dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des côtés.',frequency:1 },
      { matiere: 'Mathematiques', question: 'Quelle est la formule du théorème de Pythagore ?', answer: 'Dans un triangle rectangle, le carré de l\'hypoténuse est égal à la somme des carrés des deux autres côtés., ',frequency:1},
  { matiere: 'Mathematiques', question: 'Définissez une fonction quadratique.', answer: 'Une fonction quadratique est une fonction polynomiale du second degré, généralement écrite sous la forme f(x) = ax^2 + bx + c.',frequency:1 },
      
      { matiere: 'Physique', question: 'Qu\'est-ce que la loi de Newton sur l\'action et la réaction ?', answer: 'Pour chaque action, il existe une réaction égale et opposée.',frequency:1 },
      { matiere: 'Physique', question: 'Qu\'est-ce que la relativité restreinte ?', answer: 'La relativité restreinte est une théorie physique décrivant les phénomènes proches de la vitesse de la lumière.',frequency:1 },
      { matiere: 'Physique', question: 'Qu\'est-ce que la mécanique quantique ?', answer: 'La mécanique quantique est une branche de la physique qui étudie le comportement des particules subatomiques.',frequency:1 },
      { matiere: 'Physique', question: 'Définissez la force magnétique.', answer: 'La force magnétique est une force attractive ou répulsive entre deux objets en raison de leurs charges magnétiques.',frequency:1 },
      { matiere: 'Physique', question: 'Expliquez le concept de l\'effet Doppler.', answer: 'L\'effet Doppler est le changement de fréquence apparente d\'une onde due au mouvement relatif de la source et de l\'observateur.',frequency:1 },
      
      { matiere: 'SVT', question: 'Qu\'est-ce que la photosynthèse ?', answer: 'La photosynthèse est le processus par lequel les plantes convertissent la lumière en énergie chimique.',frequency:1 },
      { matiere: 'SVT', question: 'Qu\'est-ce qu\'une cellule eucaryote ?', answer: 'Une cellule eucaryote possède un noyau délimité par une membrane.',frequency:1 },
      { matiere: 'SVT', question: 'Qu\'est-ce que l\'ADN ?', answer: 'L\'ADN est une molécule qui contient les instructions génétiques pour le développement et le fonctionnement des organismes.',frequency:1},
      { matiere: 'SVT', question: 'Quelle est la fonction des mitochondries ?', answer: 'Les mitochondries sont les centrales énergétiques des cellules, produisant de l\'énergie sous forme d\'adénosine triphosphate (ATP).',frequency:1 },
      { matiere: 'SVT', question: 'Qu\'est-ce que l\'effet de serre ?', answer: 'L\'effet de serre est un phénomène naturel qui maintient la chaleur près de la surface de la Terre, contribuant au réchauffement de la planète.',frequency:1 },

      { matiere: 'Histoire', question: 'Quelle est la date de la Révolution française ?', answer: 'La Révolution française a commencé en 1789.',frequency:1 },
      { matiere: 'Histoire', question: 'Qu\'est-ce que la Guerre froide ?', answer: 'La Guerre froide était une période de tensions politiques entre les États-Unis et l\'Union soviétique après la Seconde Guerre mondiale.',frequency:1 },
      { matiere: 'Histoire', question: 'Quand a eu lieu la Révolution française ?', answer: 'La Révolution française a eu lieu entre 1789 et 1799.',frequency:1 },
      { matiere: 'Histoire', question: 'Quelle est la Déclaration des droits de l\'homme et du citoyen ?', answer: 'La Déclaration des droits de l\'homme et du citoyen a été adoptée pendant la Révolution française et énonce les droits fondamentaux.',frequency:1 },
      { matiere: 'Histoire', question: 'Qui était Napoléon Bonaparte ?', answer: 'Napoléon Bonaparte était un général et empereur français qui a joué un rôle majeur dans les guerres napoléoniennes.',frequency:1 },
      // ... Ajoutez d'autres flashcards au besoin
    ];

    defaultFlashcards.forEach(flashcard => {
      this.addFlashcard(flashcard).subscribe(() => {
      });
    });
  }
  
}
