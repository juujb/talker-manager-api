const fs = require('fs');
const { HTTP_NO_CONTENT_STATUS } = require('./httpStatus');

module.exports = (request, response) => {
  const { id } = request.params;

  const talkerArray = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const notDeleted = talkerArray.filter((talker) => talker.id !== Number(id));

  fs.writeFileSync('./talker.json', JSON.stringify(notDeleted));

  response.status(HTTP_NO_CONTENT_STATUS).send();
};
