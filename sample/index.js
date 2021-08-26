const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index = fs.readFileSync('./index.ejs','utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);
const PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log('server start');

function getFromClient(request, response){
  var url_parts = url.parse(request.url);
  switch(url_parts.pathname){
   case'/':
     var content = ejs.render(index,{
      title: "Indexページ",
      content: "これはテンプレートを使ったサンプルページです"
     });
     response.writeHead(200, {'Content-Type': 'text/html'});
     response.write(content);
     response.end();
     break;
     

    case'/style.css':
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('no page...');
      break;
}
}
