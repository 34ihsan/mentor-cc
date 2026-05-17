const http = require('http');
const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/services/university-placement',
  'http://localhost:3000/countries/uk',
  'http://localhost:3000/institutions/oxford'
];

(async () => {
  for (const u of urls) {
    await new Promise((resolve) => {
      http.get(u, (res) => {
        let size = 0;
        res.on('data', (chunk) => { size += chunk.length; });
        res.on('end', () => {
          console.log(`${u} -> ${res.statusCode} (${size} bytes)`);
          resolve();
        });
      }).on('error', (err) => {
        console.log(`${u} -> ERROR: ${err.message}`);
        resolve();
      });
    });
  }
})();
