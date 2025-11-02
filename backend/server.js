import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/movie.routes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: "*",
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

const __dirname = path.resolve();

app.use(express.json());

app.use("/api", router);

// if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'app/dist')));

  app.get('/', (req, res) => {
    console.log('Serving index.html for', req.url);
    res.sendFile(path.resolve(__dirname, 'app', 'index.html'));
  });
// }

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});