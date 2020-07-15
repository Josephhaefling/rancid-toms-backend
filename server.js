const cors = require('cors');
const express = require('express');
const cors = require('cors');
const app = express();
const { request, response } = require('express')
fetch(request, {mode: 'cors'});
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid-Toms';
app.use(cors());

app.get('/', (request, response) => {
    response.send("Test nodemon");
});

app.locals.comments = {
    comments: [
        { id: 123456, author: 'Jessica', comment: 'this movie is the worst!!!!!' },
    ]
};

app.locals.favorites = [
    { id: 4 },
];

app.use(express.json());
app.use(cors());

app.get('/comments', (request, response) => {
    const comments = app.locals.comments;
    response.json({ comments })
});

app.get('/comments/:id', (request, response) => {
    const movieId = parseInt(request.params.movie_id);
    const matchingMovie = app.locals.comments.comments.find(movie => {
        let movieKey = parseInt(Object.keys(movie)[0])
        return movieKey === movieId
    })
    if(!matchingMovie) response.sendStatus(404);
    response.json(matchingMovie)
})


app.post("/comments/:id", (request, response) => {
    const { user_id, author, comment, movie_id, } = request.body;
    const movieId = parseInt(movie_id);
    const date = Date.now();
    const addedMovie = { user_id, author, comment, date };

    for (let requiredParameter of ['user_id', 'author', 'comment', 'movie_id']) {
        if (!request.body[requiredParameter]) {
            return response.status(422).send({
                error: `Expected format: {user_id: <integer>, author: <string>, comment: <string>,  movie_id: <integer>}. Missing a required parameter of ${requiredParameter}!`
            })
        }
    }

    let currentCommentKeys = app.locals.comments.comments.map(movie => parseInt(Object.keys(movie)));

    if (!currentCommentKeys.includes(movieId)) app.locals.comments.comments.push({ [movieId]: [addedMovie] });

    const foundMovie = app.locals.comments.comments.find(movie => {
        const movieKey = parseInt(Object.keys(movie)[0])
        return movieKey === movieId
    })
    const foundMovieIndex = app.locals.comments.comments.indexOf(foundMovie);
    const foundMovieKey = Object.keys(foundMovie);

    if (currentCommentKeys.includes(movieId)) app.locals.comments.comments[foundMovieIndex][foundMovieKey].push(addedMovie);

    return response.status(200).json(app.locals.comments.comments[foundMovieIndex][foundMovieKey]);
})

app.get('/favorites', (request, response) => {
    const favorites = app.locals.favorites
    response.json({ favorites });
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});