import ContainerFactory from "./containerFactory";
import Container from "./container";
import { access } from "fs";

export default class Cluster{
    constructor(name, image, startCommands, ports){
        this.name = name;
        this.cf = new ContainerFactory();
        this.containers = new Array();
        this.nodes = 0;
        this.image = image;
        this.startCommands = startCommands;
        this.ports = ports;
    }

    async setNodes(nodesNumber){
        var actualNodes = this.nodes;
        if (actualNodes == nodesNumber) return;
        if (actualNodes < nodesNumber){
            await this.add(nodesNumber - actualNodes);
            return this.nodes;
        }
        if (actualNodes > nodesNumber){
            await this.remove(actualNodes - nodesNumber);
            return this.nodes;
        }
    }

    async add(qtd){
        for (var i = 0; i < qtd; i++){
            var container = new Container();
            container.setName(this.name + "_" + (this.nodes + 1));
            container.setImage(this.image);
            container.setPorts(this.ports);
            container.setStartCommands(this.startCommands);
            container.setId(await this.cf.createContainer(container));
            this.containers.push(container);
            this.nodes++;
        }
        return;
    }

    async remove(qtd){
        while (qtd > 0){
            await this.cf.destroyContainer(this.containers.pop());
            qtd--;
            this.nodes--;
        }
        return;
    }

    getContainers(){
        return this.containers;
    }

    getName(){
        return this.name;
    }
}