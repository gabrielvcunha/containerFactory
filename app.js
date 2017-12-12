import Cluster from "./cluster";
import Intelligence from "./intelligence";
import ContainerFactory from "./containerFactory";
import express from "express";

const vizceralModel = require("./vizceralModel");
var vizceral = require("./monitor");
var cf = new ContainerFactory();
var intelligence = new Intelligence();
var expressRouter = express();
var expressRoutes = express.Router();

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
    var optimized = await checkPerformance(elasticClusters);
    await optimize(optimized);
}

async function optimize(optimizedNodes){
    await disciplinas.setNodes(optimizedNodes);
    vizceral = "";
    vizceral = vizceralModel;
    for (let container of disciplinas.getContainers()){
        vizceral.nodes.push({name: container.getName()});
    }
    io.emit('json',vizceral);
    return;
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
        var optimized = await intelligence.run(memoMed, memoMax, cpuMed, qtdContainers);
        console.log("\nNúmero otimizado de containers para o cluster " + cluster.getName() + ": " + optimized);
    }
    return optimized;
}

expressRoutes.all('/start', async function(req,res){
    start();
    res.send(200);
});

expressRoutes.all('/optimize', async function(req,res){
    var optimized = await checkPerformance(elasticClusters);
    await optimize(optimized);
    res.send(200);
});

expressRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

expressRouter.use(expressRoutes);

expressRouter.listen(8087, function() {
    console.log("\n====ROUTER INICIADO====");
});