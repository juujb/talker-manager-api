const { nanoid } = require('nanoid'); 

const { HTTP_OK_STATUS, HTTP_BAD_REQUEST_STATUS } = require('./httpStatus');

const NO_EMAIL_MESSAGE = 'O campo "email" é obrigatório';
const EMAIL_FORMAT = 'O "email" deve ter o formato "email@email.com"';
const NO_PASSWORD = 'O campo "password" é obrigatório';
const PASSWORD_LENGTH = 'O "password" deve ter pelo menos 6 caracteres';

module.exports = (request, response) => {
  const { email, password } = request.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  /* usei como referência https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  e a documentação do nanoid https://github.com/ai/nanoid */

  if (!email) return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: NO_EMAIL_MESSAGE });

  const emailTest = regex.test(email);
  if (!emailTest) return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: EMAIL_FORMAT });

  if (!password) return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: NO_PASSWORD });

  const pwdTest = password.length < 6;
  if (pwdTest) return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: PASSWORD_LENGTH });

  const token = nanoid(16);
  return response.status(HTTP_OK_STATUS).json({ token });
};
