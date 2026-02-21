const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));
const replacements = [
  ['#7cfc9e', '#38bdf8'],
  ['#a8ffbe', '#7dd3fc'],
  ['rgba(13,13,13', 'rgba(7,17,31'],
  ['rgba(124,252,158', 'rgba(56,189,248'],
  ['#0d0d0d', '#07111f'],
  ['#e8e8e8', '#e2eaf4'],
  ['#888888', '#6b8ba4'],
  ['#252525', '#1a3248'],
  ['#161616', '#0d1e30'],
  ['#1a1a1a', '#112030'],
  ['rgba(37,37,37', 'rgba(26,50,72'],
];
files.forEach(f => {
  const fp = path.join('src/components', f);
  let c = fs.readFileSync(fp, 'utf8');
  replacements.forEach(([from, to]) => { c = c.split(from).join(to); });
  fs.writeFileSync(fp, c);
  console.log('Updated', f);
});
