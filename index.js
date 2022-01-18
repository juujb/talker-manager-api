const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const createTalker = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');

const {
  tokenCheck, nameCheck, ageCheck, talkCheck, rateCheck, dateCheck,
} = require('./middlewares/talkerValidation');

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
    dateCheck,
    rateCheck,
    createTalker,
);

app.route('/talker/:id')
  .get(getTalkerById)
  .put(
    tokenCheck,
    nameCheck,
    talkCheck,
    ageCheck,
    rateCheck,
    dateCheck,
    editTalker,
)
  .delete(
    tokenCheck,
    deleteTalker,
  );

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
