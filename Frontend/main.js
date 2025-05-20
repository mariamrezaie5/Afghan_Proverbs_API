import express from 'express';
import path from 'path';
import routes from './routes.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting ejs file
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Frontend server is running at http://localhost:${PORT}`);
});
