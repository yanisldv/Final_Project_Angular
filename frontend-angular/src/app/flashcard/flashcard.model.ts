export class Flashcard {
  constructor(
    public matiere: string,
    public question: string,
    public answer: string,
    public frequency: number = 1
  ) {}
}