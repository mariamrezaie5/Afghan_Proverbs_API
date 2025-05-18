import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// File Path Settings
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const dataPath = path.join(__dirname, '../database/proverbs.json');

// Reading Proverbs
const loadProverbs = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

// Writing Proverbs
const saveProverbs = (proverbs) => {
  fs.writeFileSync(dataPath, JSON.stringify(proverbs, null, 2), 'utf-8');
};

// GET all proverbs
router.get('/', (req, res) => {
  const proverbs = loadProverbs();
  res.json(proverbs);
});

//Bonus Features:
// GET random proverb
router.get('/random', (req, res) => {
    const proverbs = loadProverbs();
    const random = proverbs[Math.floor(Math.random() * proverbs.length)];
    res.json(random);
});

// GET a single proverb by ID
router.get('/:id', (req, res) => {
  const proverbs = loadProverbs();
  const id = parseInt(req.params.id);
  const proverb = proverbs.find(p => p.id === id);
  if (!proverb) return res.status(404).json({ error: 'Proverb Not found' });
  res.json(proverb);
});
// Filter Proverbs by category
router.get('/', (req, res) => {
  const { category } = req.query;
  const proverbs = loadProverbs();
  if (category) {
    const filteredProverbs = proverbs.filter(proverb =>
      proverb.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProverbs.length === 0) {
      return res.status(404).json({ error: 'No proverbs found' });
    }

    return res.json(filteredProverbs);
  }

  res.json(proverbs);
});

// Adding a new proverb
router.post('/', (req, res) => {
  const { dari, pashto, english, meaning, category } = req.body;
  if (!dari || !pashto || !english || !meaning || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const proverbs = loadProverbs();
  const newProverb = {
    id: proverbs.length > 0 ? proverbs[proverbs.length - 1].id + 1 : 1,
    dari,
    pashto,
    english,
    meaning,
    category
  };

  proverbs.push(newProverb);
  saveProverbs(proverbs);
  res.status(201).json(newProverb);
});

// Update an existing proverb
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const proverbs = loadProverbs();
  const index = proverbs.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const updated = { ...proverbs[index], ...req.body, id }; 
  proverbs[index] = updated;
  saveProverbs(proverbs);
  res.json(updated);
});

// DELETE a proverb
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let proverbs = loadProverbs();
  const index = proverbs.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const deleted = proverbs.splice(index, 1);
  saveProverbs(proverbs);
  res.json(deleted[0]);
});

export default router;