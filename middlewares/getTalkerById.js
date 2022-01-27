const fs = require('fs');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('./httpStatus');

const NOT_FOUND_MESSAGE = 'Pessoa palestrante não encontrada';

module.exports = (request, response) => {
  const array = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const matchId = request.params.id;

  const talkerIndex = array.findIndex((talkerInfo) => talkerInfo.id === Number(matchId));

  const resolution = (talkerIndex === -1)
    ? response.status(HTTP_NOT_FOUND_STATUS).json({ message: NOT_FOUND_MESSAGE })
    : response.status(HTTP_OK_STATUS).json(array[talkerIndex]);

  return resolution;
};
