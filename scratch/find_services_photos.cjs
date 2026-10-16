const https = require('https');

function get(url) {
  return new Promise(resolve => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const repoRes = await get('https://api.github.com/search/repositories?q=plumbing+hvac+website&sort=stars');
  try {
    const data = JSON.parse(repoRes);
    console.log('Repos count:', data.items?.length);
    for (const repo of (data.items || []).slice(0, 15)) {
      const treeRes = await get(`https://api.github.com/repos/${repo.full_name}/git/trees/${repo.default_branch}?recursive=1`);
      const treeData = JSON.parse(treeRes);
      const files = (treeData.tree || []).filter(f => 
        (f.path.endsWith('.js') || f.path.endsWith('.jsx') || f.path.endsWith('.ts') || f.path.endsWith('.tsx') || f.path.endsWith('.json')) &&
        (f.path.includes('service') || f.path.includes('data') || f.path.includes('card') || f.path.includes('home') || f.path.includes('mock'))
      );
      for (const f of files.slice(0, 5)) {
        const raw = await get(`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${f.path}`);
        const unsplash = raw.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
        if (unsplash) {
          console.log(`[${repo.full_name}] ${f.path}`);
          [...new Set(unsplash)].forEach(u => console.log('  ', u));
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

run();
