const fs = require('fs');
const path = require('path');

console.log('Current directory:', process.cwd());
console.log('Directory contents:', fs.readdirSync('.'));
console.log('Public directory contents:', fs.readdirSync('./public'));