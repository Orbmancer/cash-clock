// Use this node script to generate an image pack
// Node version > 7

if (!process.env.ACCESS_TOKEN) {
  throw new Error('You must call the script with an ACCESS_TOKEN env var, see README.md for documentation');
}

const https = require('https');

const query = 'landscape';
let photos = [];

const storePhotosAtPage = (page, writeToConsole = false) => {
  const options = {
    hostname: 'api.unsplash.com',
    port: 443,
    path: `/search/photos?query=${query}&page=${page}`,
    headers: {
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    }
  };

  https.get(options, function(res) {
    let body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      body = JSON.parse(body);
      if (body.results && body.results.length > 0) {
        photos = photos.concat(body.results);
      }

      if (writeToConsole) {
        console.log(photos.length + ' photos written in ./backgrounds.json');
        var fs = require('fs');
        fs.writeFile('backgrounds.json', JSON.stringify(photos));
      }
    });
  }).on('error', function(e) {
    throw e;
  });
}

const lastPage = 10;
for (let i=1; i<=lastPage; i++) {
  storePhotosAtPage(i, i == lastPage);
}

