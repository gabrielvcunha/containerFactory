import ContainerFactory from "./containerFactory";
import Container from "./container";

var cf = new ContainerFactory();
var msg = undefined;
var disciplinasContainers = new Array();

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
}
start();