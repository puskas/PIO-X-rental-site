console.log('Starting server ...')

const http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer((request, response) => {
  
  let fileUrl = (request.url == '/') ? 'index.html' : request.url;
  fs.readFile('./' + fileUrl, (err, data) => {
    if (!err) {
      let filepath = path.resolve('./' + fileUrl);
      console.log(`filepath = ${filepath}`)
      let fileExt = path.extname(filepath);
      console.log(`fileExt = ${fileExt}`)
      let mimeType = mimeLookup[fileExt];
      console.log(`mimeType = ${mimeType}`)
      response.setHeader('Content-type' , mimeType);
      response.end(data);
      console.log( fileUrl, mimeType );
    } else {
      console.log ('file not found: ' + fileUrl);
      send404(response);
    }
  });
})    
server.listen(8081)  

function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Resource not found.');
  response.end();
}

const mimeLookup = {
  '.html' : 'text/html',
  '.ico' : 'image/x-icon',
  '.jpg' : 'image/jpeg',
  '.png' : 'image/png',
  '.gif' : 'image/gif',
  '.css' : 'text/css',
  '.js' : 'text/javascript'
};



