const fs = require('fs');
const { HTTP_CREATED_STATUS } = require('./httpStatus');

module.exports = (request, response) => {
  const { name, age, talk } = request.body;
  const talkersArray = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const id = talkersArray.length + 1;
  const newTalker = { id, name, age, talk };
  fs.writeFileSync('./talker.json', JSON.stringify([...talkersArray, newTalker]));
  return response.status(HTTP_CREATED_STATUS).send(newTalker);
};