const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const {
  tokenCheck, nameCheck, ageCheck, talkCheck, rateCheck,
} = require('./middlewares/talkerValidation');
const createTalker = require('./middlewares/createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = require('./middlewares/httpStatus');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.route('/talker')
  .get(getAllTalkers)
  .post(
    tokenCheck,
    nameCheck,
    ageCheck,
    talkCheck,
    rateCheck,
    createTalker,
);

app.get('/talker/:id', getTalkerById);

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
