import ContainerFactory from "./containerFactory";
import Container from "./container";

export default class Cluster{
    constructor(name, image, startCommands, ports){
        this.name = name;
        this.cf = new ContainerFactory();
        this.containers = new Array();
        this.image = image;
        this.startCommands = startCommands;
        this.ports = ports;
    }

    async add(qtd){
        for (var i = 0; i < qtd; i++){
            var container = new Container();
            container.setName(this.name + "_" + (i+1));
            container.setImage(this.image);
            container.setPorts(this.ports);
            container.setStartCommands(this.startCommands);
            container.setId(await this.cf.createContainer(container));
            this.containers.push(container);
        }
        return;
    }

    getContainers(){
        return this.containers;
    }
}