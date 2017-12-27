const fs = require('fs');

let files = fs.readdirSync('.');
let dist = fs.openSync('./base.txt', 'a');
let buf = '';
for (let i =0; i<files.length; i++) {
	let content =  fs.readFileSync(files[i]);
	
	buf += files[i] + '-->: data:image/' + files[i].split('.').slice(-1) + ';base64,'+ content.toString('base64') + '\r\n';
}

fs.writeSync(dist, buf);
fs.close(dist)
