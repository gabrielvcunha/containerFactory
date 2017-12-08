import ContainerFactory from "./containerFactory";
import Container from "./container";
import Intelligence from "./intelligence";

var cf = new ContainerFactory();
var msg = undefined;
var disciplinasContainers = new Array();
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

async function start(){
    var container = new Container();
    container.setName("router");
    container.setImage("node");
    container.setPorts("127.0.0.1:8080:8080");
    container.setStartCommands("git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout router; npm install; npm start");
    container.setId(await cf.createContainer(container));
    async function createDisciplinas(qtd){
        for (var i = 0; i < qtd; i++){
            var container = new Container();
            container.setName("disciplinas_" + (i+1));
            container.setImage("node");
            container.setStartCommands("git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout disciplinas; npm install; npm start");
            container.setId(await cf.createContainer(container));
            disciplinasContainers.push(container);
        }
        return;
    }
    await createDisciplinas(5);
    setInterval(function(){
        io.emit('json',JSON.stringify(disciplinasContainers));
    },2000);
}
//start();
var intelligence = new Intelligence();
intelligence.run();