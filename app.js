import Cluster from "./cluster";
import Intelligence from "./intelligence";
import ContainerFactory from "./containerFactory";

var vizceral = require("./monitor");
var cf = new ContainerFactory();
var intelligence = new Intelligence();

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

var elasticClusters = [];
var disciplinas = new Cluster('disciplinas', 'node', "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout disciplinas; npm install; npm start");
var router = new Cluster('router', 'node', "git clone https://github.com/gabrielvcunha/frameworkufrrj_ms.git; cd /frameworkufrrj_ms; git checkout router; npm install; npm start","127.0.0.1:8080:8080");

elasticClusters.push(disciplinas);

async function start(){
    await router.setNodes(1);
    await disciplinas.setNodes(6);
    for (let container of disciplinas.getContainers()){
        vizceral.nodes.push({name: container.getName()});
    }
    io.emit('json',vizceral);
    await checkPerformance(elasticClusters);
}

async function checkPerformance(clusterGroup){
    var stats = await cf.showStats();
    for (let cluster of clusterGroup){
        console.log("===================================");
        console.log("==  ANÁLISE DE CLUSTER INICIADA  ==");
        console.log("===================================");
        console.log("Cluster: " + cluster.getName());
        var qtdContainers = cluster.getContainers().length;
        var memoMax = 0;
        var memoMed = 0;
        var cpuMed = 0;
        for (let container of cluster.getContainers()){
            for (var i = 0; i < stats.length; i++){
                var containerStats = stats[i];
                if (container.getId().includes(containerStats[0])){
                    memoMax += parseFloat(containerStats[2]);
                    cpuMed += parseFloat(containerStats[1]);
                }
            }
        }
        memoMed = memoMax / qtdContainers;
        cpuMed = cpuMed / qtdContainers;
        console.log("Quantidade de containers: " + qtdContainers);
        console.log("Uso total de memória: " + memoMax);
        console.log("Uso médio de memória: " + memoMed);
        console.log("Uso médio de CPU: " + cpuMed);
        var otimizacao = await intelligence.run(memoMed, memoMax, cpuMed, qtdContainers);
        console.log("\nNúmero otimizado de containers para o cluster " + cluster.getName() + ": " + otimizacao);
    }
    return;
}

start();

