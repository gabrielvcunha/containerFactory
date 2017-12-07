export default class Container{
    constructor(){
        this.name = undefined;
        this.image = undefined;
        this.startCommands = undefined;
        this.ports = undefined;
        this.id = undefined;
    }
    
    getName(){
        return this.name;
    }
    
    getImage(){
        return this.image;
    }
    
    getStartCommands(){
        return this.startCommands;
    }
    
    getPorts(){
        return this.ports;
    }
    
    getId(){
        return this.id;
    }

    setName(name){
        this.name = name;
    }
    
    setImage(image){
        this.image = image;
    }
    
    setStartCommands(startCommands){
        this.startCommands = startCommands;
    }
    
    setPorts(ports){
        this.ports = ports;
    }
    
    setId(id){
        this.id = id;
    }
}