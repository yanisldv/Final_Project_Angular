const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let flashcards = [];

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});
app.get('/api/flashcards/count', (req, res) => {
    const flashcardCount = flashcards.length;
    console.log('Flashcards count:', flashcardCount);
    res.json({ count: flashcardCount });
  });
app.post('/api/flashcards', (req, res) => {
  const newFlashcard = req.body;
  flashcards.push(newFlashcard);
  res.json(newFlashcard);
});
app.get('/api/distinct-matieres', (req, res) => {
  const distinctMatieres = ['Mathematiques', 'Physique', 'SVT', 'Histoire'];
  res.json(distinctMatieres);
});
app.get('/api/flashcards/:matiere', (req, res) => {
  const matiere = req.params.matiere;
  const flashcardsByMatiere = flashcards.filter(flashcard => flashcard.matiere === matiere);
  console.log(matiere)
  res.json(flashcardsByMatiere);
});
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Appel de la fonction startServer pour démarrer le serveur
startServer();