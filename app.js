import ContainerFactory from "./containerFactory";

var cf = new ContainerFactory();
var msg = undefined;

async function start(){
    console.log("> Criando container router");
    var commands = "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout router; npm install; npm start";
    msg = await cf.createContainer("router", "node", commands, "127.0.0.1:8080:8080");
    console.log(msg);

    console.log("> Criando container disciplinas 1");
    var commands = "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout disciplinas; npm install; npm start";
    msg = await cf.createContainer("disciplinas_1", "node", commands);
    console.log(msg);

    console.log("> Criando container disciplinas 2");
    var commands = "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout disciplinas; npm install; npm start";
    msg = await cf.createContainer("disciplinas_2", "node", commands);
    console.log(msg);
}
start();