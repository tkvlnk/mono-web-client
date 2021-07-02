const fs = require('fs');
const https = require('https');

const mccGroups = require('../src/mccData/mccGroups.json');

const promises = Object.values(mccGroups).map(({ image: { url, name } }) => {
  const file = fs.createWriteStream(`./images/${name}`);

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file).on('end', resolve).on('error', reject);
    });
  });
});

void Promise.all(promises).then(() => console.log('all done'));
