import express from 'express';
import bodyParser from 'body-parser';
import proverbsRoutes from './routes/route.js';

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware settings
app.use(bodyParser.json());
app.use('/proverbs', proverbsRoutes);

// Running Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
