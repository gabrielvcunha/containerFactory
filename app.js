import Cluster from "./cluster";
import Intelligence from "./intelligence";

var vizceral = require("./monitor");

var app = require('http').createServer(index)
    , io = require('socket.io')(80)
    , fs = require('fs')
;
app.listen(3000, function() {
    console.log("Servidor rodando!");
});
function index(req, res){
    fs.readFile(__dirname + '/index.html', function(err, data){
        res.writeHead(200);
        res.end(data);
    });
};

var disciplinas = new Cluster('disciplinas', 'node', "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout disciplinas; npm install; npm start");
var router = new Cluster('router', 'node', "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout router; npm install; npm start");

async function start(){
    await router.add(1);
    await disciplinas.add(2);
    for (let container of disciplinas.getContainers()){
        vizceral.nodes.push({name: container.getName()});
    }
    io.emit('json',vizceral);
    console.log(vizceral);
}
//start();

var intelligence = new Intelligence();
intelligence.run();