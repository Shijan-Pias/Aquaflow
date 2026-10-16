const https = require('https');

function get(url) {
  return new Promise(resolve => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const content = await get('https://raw.githubusercontent.com/pv-webservices/Plumbing-HVAC-Website-/main/src/data.ts');
  console.log('CONTENT OF DATA.TS:');
  console.log(content);
}

run();
