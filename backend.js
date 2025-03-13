// Use file system, fs
const fs = require('fs');

// Use express
const express = require('express');

// Create a web server
const server = express();

// Serve the content in the client folder
server.use(express.static('client'));

// Start the server at port 3000
server.listen(3008, () => console.log('Listening on http://localhost:3008'));

// get all files in  a folder
// can be used like this:  /api/images
// or this:                /api/images?path=dogs
server.get('/api/images', (request, response) => {
  let path = request.query.path || '';

  // Fix to make traversal attacks impossible
  path = path.replaceAll('..', '');

  if (path && path.slice(-1) !== '/') { path += '/'; }

  let fileList = fs.readdirSync('./client/images/' + path)
    .map(x => '/images/' + path + x)

  response.json(fileList);
});