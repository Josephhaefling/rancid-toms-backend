const cors = require('cors');
app.use(cors());
const express = require('express');
const app = express();
const fetch = require("node-fetch");
const { request, response } = require('express')
fetch(request, {mode: 'cors'});
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid-Toms';

app.get('/', (request, response) => {
    response.send("Hi Alex");
});

app.locals.comments = [
    { movieId: 123456, author: 'Jessica', comment: 'this movie is the worst!!!!!' },
];

app.locals.favorites = [
    { id: 4 },
];

app.get('/comments', (request, response) => {
    const comments = app.locals.comments;
    response.json({ comments })
});

app.get('/favorites', (request, response) => {
    const favorites = app.locals.favorites
    response.json({ favorites });
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});