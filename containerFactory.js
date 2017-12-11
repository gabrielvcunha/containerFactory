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

    async showStats(){
        var result = [];
        var stats = await this.getStats();
        var statsArray = stats.split("\n");
        for (var i = 0; i < statsArray.length; i++){
            if (i == 0) continue;
            if (i == (statsArray.length - 1)) continue;
            var containerStats = statsArray[i];
            var remove = "";
            var flag = false;
            var stat = "";
            var count = 0;
            var parcialResult = [];
            for (var z = 0; z < 12; z++){
                remove += containerStats.charAt(z);
            }
            parcialResult.push(remove);
            containerStats = containerStats.replace(remove,"");
            remove = "";
            for (var j = 0; j < containerStats.length; j++){
                var code = containerStats.charCodeAt(j); 
                if (((code > 47) && (code < 58)) || (code == 46)){
                    stat += containerStats.charAt(j);
                    flag = true;
                }
                else{
                    if (flag){
                        parcialResult.push(stat);
                        stat = "";
                        flag = false;
                        count++;
                        if (count == 2){
                            result.push(parcialResult);
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }
}