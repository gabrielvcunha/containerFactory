import Fuzzy from "./fuzzyLogic/fuzzy";

export default class Intelligence{
    constructor(){
        this.fuzz = [];

        this.memoMax = new Fuzzy("Total de memória em uso");
        this.memoMax.add('eficiente', 0, 0, 100, 200);
        this.memoMax.add('medio', 150, 300, 500, 650);
        this.memoMax.add('deficiente', 600, 700, 1000, 1000);
        this.fuzz[0] = undefined;

        this.memoMed = new Fuzzy("Média de uso de memória por container");
        this.memoMed.add('eficiente', 0, 0, 40, 80);
        this.memoMed.add('medio', 70, 90, 140, 170);
        this.memoMed.add('deficiente', 160, 200, 300, 300);
        this.fuzz[1] = undefined;

        this.cpuMed = new Fuzzy("Média de uso de CPU por container");
        this.cpuMed.add('eficiente', 0, 0, 20, 35);
        this.cpuMed.add('medio', 30, 40, 55, 65);
        this.cpuMed.add('deficiente', 60, 75, 100, 100);
        this.fuzz[2] = undefined;
        
        this.qtdContainers = new Fuzzy("Quantidade de containers ativos");
        this.qtdContainers.add('eficiente', 0, 0, 1, 3);
        this.qtdContainers.add('medio', 2, 3, 4, 5);
        this.qtdContainers.add('deficiente', 3, 5, 6, 6);
        this.fuzz[3] = undefined;

        this.custoCriacao = new Fuzzy("Custo estimado de geração de um container");
        this.custoCriacao.add('eficiente', 0, 0, 20, 35);
        this.custoCriacao.add('medio', 30, 40, 55, 70);
        this.custoCriacao.add('deficiente', 60, 90, 120, 120);
        this.fuzz[4] = undefined;
    }

    applyRules(){
        var rules = [
            [0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2]
        ]
        var results = [
            [5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5]
        ];
        
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 6; j++){
                if (rules[i][j] == undefined) continue; 
                if (j < 5){
                    var result = this.fuzz[j];
                    results[i][j] = result[rules[i][j]].fuzzy;
                }
                if (j == 5){
                    var min = 1;
                    for (var a = 0; a < 5; a++){
                        if (results[i][a] < min) min = results[i][a]; 
                    }
                    results[i][j] = min;
                }
            }
        }
        console.log(results);
    }

    run(){
        this.fuzz[0] = this.memoMax.fuzzify(657);
        this.fuzz[1] = this.memoMed.fuzzify(134);
        this.fuzz[2] = this.cpuMed.fuzzify(43);
        this.fuzz[3] = this.qtdContainers.fuzzify(3);
        this.fuzz[4] = this.custoCriacao.fuzzify(74);
        this.applyRules();
    }
}