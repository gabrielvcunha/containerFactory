import Fuzzy from "./fuzzyLogic/fuzzy";

export default class Intelligence{
    constructor(){
        this.rules = [
            [1, 0, 1, 0, 1],
            [3, 1, 0, 0, 2],
            [3, 2, 0, 0, 3],
            [0, 0, 3, 1, 2],
            [0, 0, 3, 2, 3],
            [1, 0, 0, 3, 2],
            [1, 0, 0, 2, 1]
        ]
        this.fuzz = [];
        this.max = [];
        this.maxElements = 0;
        this.finalResult = undefined;

        this.memoMed = new Fuzzy("Média de uso de memória por container");
        this.memoMed.add('eficiente', 0, 0, 40, 80);
        this.memoMed.add('medio', 70, 90, 140, 170);
        this.memoMed.add('deficiente', 160, 200, 300, 300);
        this.fuzz[0] = undefined;

        this.memoMax = new Fuzzy("Total de memória em uso");
        this.memoMax.add('eficiente', 0, 0, 100, 200);
        this.memoMax.add('medio', 150, 300, 500, 650);
        this.memoMax.add('deficiente', 600, 700, 1000, 1000);
        this.fuzz[1] = undefined;

        this.cpuMed = new Fuzzy("Média de uso de CPU por container");
        this.cpuMed.add('eficiente', 0, 0, 20, 35);
        this.cpuMed.add('medio', 30, 40, 55, 65);
        this.cpuMed.add('deficiente', 60, 75, 100, 100);
        this.fuzz[2] = undefined;
        
        this.qtdContainers = new Fuzzy("Quantidade de containers ativos");
        this.qtdContainers.add('eficiente', 1, 1, 2, 4);
        this.qtdContainers.add('medio', 3, 4, 5, 6);
        this.qtdContainers.add('deficiente', 4, 6, 7, 7);
        this.fuzz[3] = undefined;
    }

    applyRules(){
        var results = [
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5]
        ];
        
        for (var i = 0; i < 7; i++){
            for (var j = 0; j < 5; j++){
                if (this.rules[i][j] == undefined) continue; 
                if (j < 4){
                    if (this.rules[i][j] == 0) continue;
                    var result = this.fuzz[j];
                    results[i][j] = result[(this.rules[i][j] - 1)].fuzzy;
                }
                if (j == 4){
                    var min = 1;
                    for (var a = 0; a < 4; a++){
                        if (results[i][a] < min) min = results[i][a]; 
                    }
                    results[i][j] = min;
                }
            }
        }
        console.log("\nResultados fuzzificados:");
        console.log(results);
        return results;
    }

    defuzzResults(results){
        var fuzz = [];
        var maxSum = 0;
        for (var i = 0; i < 7; i++){
            if (results[i][4] > 0.5){
                fuzz.push([(this.rules[i][4] - 1), results[i][4]]);
                var newMax = this.qtdContainers.defuzzify([(this.rules[i][4] - 1), results[i][4]]);
                this.max.push(newMax);
                this.maxElements++;
                maxSum += newMax;
            }
        }
        var maxMed = maxSum / this.maxElements;
        this.finalResult = Math.round(maxMed);
        console.log("\nMáximos defuzzificados:");
        console.log(this.max);
        console.log("\nMédia dos máximos:");
        console.log(maxMed);
        console.log("\nResultado final:");
        console.log(this.finalResult);
    }

    run(memoMed, memoMax, cpuMed, qtdContainers){
        if (memoMed == undefined) return false;
        if (memoMax == undefined) return false;
        if (cpuMed == undefined) return false;
        if (qtdContainers == undefined) return false;
        console.log("===================================");
        console.log("==     INTELIGÊNCIA INICIADA     ==");
        console.log("===================================");
        this.fuzz[0] = this.memoMed.fuzzify(memoMed);
        this.fuzz[1] = this.memoMax.fuzzify(memoMax);
        this.fuzz[2] = this.cpuMed.fuzzify(cpuMed);
        this.fuzz[3] = this.qtdContainers.fuzzify(qtdContainers);
        console.log("Conjuntos fuzzy:");
        console.log(this.fuzz);
        var results = this.applyRules();
        this.defuzzResults(results);
        return this.finalResult;
    }
}