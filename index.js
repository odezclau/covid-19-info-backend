import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/news/:region', async (req, res) => {
  try {
    const region = req.params.region;
    const url = `https://coronavirus-smartable.p.rapidapi.com/news/v1/${region}/`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a13fced244mshc9b5e101de260e1p13c85bjsn664df700b7d1',
        'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const newsData = await response.json();
    res.json(newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/stats/:region', async (req, res) => {
  try {
    const region = req.params.region;
    const url = `https://coronavirus-smartable.p.rapidapi.com/stats/v1/${region}/`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a13fced244mshc9b5e101de260e1p13c85bjsn664df700b7d1',
        'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const newsData = await response.json();
    res.json(newsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
