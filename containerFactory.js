import shell from "node-powershell";

export default class ContainerFactory{
    
    constructor(){
        this.ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });
    }
    
    async createContainer(name, image, commands, ports){
        var cmd = 'docker run -d';
        var msg = undefined;
        if (ports != undefined) cmd += ' -p ' + ports;
        cmd += ' --name=' + name;
        cmd += ' ' + image + ' /bin/bash';
        if (commands != undefined) cmd += ' -c "' + commands + '"';
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
}