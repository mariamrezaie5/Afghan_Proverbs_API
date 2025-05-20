import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_URL = "https://afghan-proverbs-api.onrender.com";

// Homepage that shows all proverbs
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/proverbs`);
    const proverbs = response.data;
    res.render('index', { proverbs ,error: null });
  } catch (error) {
    res.render('index', { proverbs: [], error: ' Error in showing proverbs  ' });
  }
});

//Showing one proverb in details
router.get('/show/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/proverbs/${req.params.id}`);
    res.render('show', { proverb: response.data });
  } catch (error) {
    res.redirect('/');
  }
});

// Showing form page to add new proverb
router.get('/form', (req, res) => {
  res.render('form', { error: null });
});

// Saving proverbs
router.post('/form', async (req, res) => {
  try {
    await axios.post(`${API_URL}/proverbs`, req.body);
    res.redirect('/');
  } catch (error) {
    res.render('form', { error: 'Error in saving proverb' });
  }
});

// Editing Form page
router.get('/edit/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/proverbs/${req.params.id}`);
    res.render('edit', { proverb: response.data, error: null });
  } catch (error) {
    res.redirect('/');
  }
});

// Saving edited proverb
router.post('/edit/:id', async (req, res) => {
  try {
    await axios.put(`${API_URL}/proverbs/${req.params.id}`, req.body);
    res.redirect(`/show/${req.params.id}`);
  } catch (error) {
    res.render('edit', { proverb: req.body, error: 'Error in saving proverb' });
  }
});

//Deleting proverb
router.post('/delete/:id', async (req, res) => {
  try {
    await axios.delete(`${API_URL}/proverbs/${req.params.id}`);
    res.redirect('/');
  } catch (error) {
    res.redirect(`/show/${req.params.id}`);
  }
});

// Searching proverbs by id
router.get('/search', (req, res) => {
  res.render('search', { proverb: null, error: null });
});

router.post('/search', async (req, res) => {
  const { id } = req.body;
  try {
    const response = await axios.get(`${API_URL}/proverbs/${id}`);
    res.render('search', { proverb: response.data, error: null });
  } catch (error) {
    res.render('search', { proverb: null, error: 'Nothing Found!' });
  }
});

//ُShowing proverbs randomely
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/proverbs/random`);
    const proverb= response.data;
    res.render('random',{proverb});
  } catch (error) {
    res.render('random',{proverb: null, error:'Error in showing proverb'});
  }
});
export default router;
