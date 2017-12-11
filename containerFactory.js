import shell from "node-powershell";
import Container from "./container";

export default class ContainerFactory{
    
    constructor(){
        this.ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });
    }
    
    async createContainer(container){
        var cmd = 'docker run -d';
        var msg = undefined;
        if (container.getPorts() != undefined) cmd += ' -p ' + container.getPorts();
        cmd += ' --name=' + container.getName();
        cmd += ' ' + container.getImage() + ' /bin/bash';
        if (container.getStartCommands() != undefined) cmd += ' -c "' + container.getStartCommands() + '"';
        await this.ps.addCommand(cmd)
        await this.ps.invoke()
        .then(output => {
          msg = output;
        })
        .catch(err => {
          msg = err;
          this.ps.dispose();
        });
        return msg;
    }

    async destroyContainer(container){
        var cmd = "docker stop " + container.getName();
        var msg = undefined;
        await this.ps.addCommand(cmd)
        await this.ps.invoke()
        .then(output => {
          msg = output;
        })
        .catch(err => {
          msg = err;
          this.ps.dispose();
          return msg;
        });
        cmd = "docker rm " + container.getName();
        await this.ps.addCommand(cmd)
        await this.ps.invoke()
        .then(output => {
          msg = output;
        })
        .catch(err => {
          msg = err;
          this.ps.dispose();
        });
        return msg;
    }

    async getStats(){
        var cmd = "docker stats --no-stream";
        var msg = undefined;
        await this.ps.addCommand(cmd)
        await this.ps.invoke()
        .then(output => {
          msg = output;
        })
        .catch(err => {
          msg = err;
          this.ps.dispose();
          return msg;
        });
        return msg;
    }
}