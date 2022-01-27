const fs = require('fs');
const { HTTP_OK_STATUS } = require('./httpStatus');

module.exports = (_request, response) => {
  const array = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  const resolution = !array.length
    ? response.status(HTTP_OK_STATUS).json([])
    : response.status(HTTP_OK_STATUS).json(array);
  
  return resolution;
};
