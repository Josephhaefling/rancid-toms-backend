const express = require('express');
const app = express();
const cors = require('cors');
const { request, response} = require('express')

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid-Toms';

app.get('/', (request, response) => {
    response.send("Hi Alex");
});

app.locals.comments = {
    comments: [
        { id: 123456, author: 'Jessica', comment: 'this movie is the worst!!!!!' },
    ]
};

app.locals.favorites = [
    { id: 4 },
];

app.get('/comments', (request, response) => {
    const comments = app.locals.comments;
    response.json({ comments })
});

app.get('/comments/:id', (request, response) => {
    const comments = app.locals.comments;
    response.json({ comments })
})

app.get('/favorites', (request, response) => {
    const favorites = app.locals.favorites
    response.send({ favorites });
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});