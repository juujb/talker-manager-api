const {
  HTTP_BAD_REQUEST_STATUS, HTTP_UNAUTHORIZED_STATUS,
} = require('./httpStatus');

const NO_TOKEN = { message: 'Token não encontrado' };
const TOKEN_CHECK = { message: 'Token inválido' };
const NO_NAME = { message: 'O campo "name" é obrigatório' };
const NAME_CHECK = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const NO_AGE = { message: 'O campo "age" é obrigatório' };
const AGE_CHECK = { message: 'A pessoa palestrante deve ser maior de idade' };
const NO_TALK = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};
const DATE_CHECK = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
const RATE_CHECK = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

const tokenCheck = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).json(NO_TOKEN);
  }
  if (token.length < 16) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).json(TOKEN_CHECK);
  }
  next();
};

const nameCheck = (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(NO_NAME);
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(NAME_CHECK);
  }
  next();
};

const ageCheck = (request, response, next) => {
  const { age } = request.body;
  if (!age) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(NO_AGE);
  }
  if (age < 18) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(AGE_CHECK);
  }
  next();
};

const talkCheck = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(NO_TALK);
  }
  next();
};

const dateCheck = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(DATE_CHECK);
  }
  next();
};

const rateCheck = (request, response, next) => {
  const { talk: { rate } } = request.body;
  if (rate > 5 || rate < 1) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json(RATE_CHECK);
  }
  next();
};

module.exports = { tokenCheck, nameCheck, ageCheck, talkCheck, dateCheck, rateCheck };