const fs = require('fs');
const { HTTP_OK_STATUS } = require('./httpStatus');

module.exports = (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;
  
  const talkerArray = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerIndex = talkerArray.findIndex((talkerInfo) => talkerInfo.id === Number(id));

  const editedTalker = { id: Number(id), name, age, talk };

  talkerArray[talkerIndex] = editedTalker;

  fs.writeFileSync('./talker.json', JSON.stringify(talkerArray));

  return response.status(HTTP_OK_STATUS).json(editedTalker);
};
