import Fuzzy from "./fuzzyLogic/fuzzy";

export default class Intelligence{
    constructor(){
        this.memoMax = new Fuzzy("Total de memória em uso");
        this.memoMax.add('eficiente', 0, 0, 100, 200);
        this.memoMax.add('medio', 150, 300, 500, 650);
        this.memoMax.add('deficiente', 600, 700, 1000, 1000);

        this.memoMed = new Fuzzy("Média de uso de memória por container");
        this.memoMed.add('eficiente', 0, 0, 40, 80);
        this.memoMed.add('medio', 70, 90, 140, 170);
        this.memoMed.add('deficiente', 160, 200, 300, 300);

        this.cpuMed = new Fuzzy("Média de uso de CPU por container");
        this.cpuMed.add('eficiente', 0, 0, 20, 35);
        this.cpuMed.add('medio', 30, 40, 55, 65);
        this.cpuMed.add('deficiente', 60, 75, 100, 100);
        
        this.qtdContainers = new Fuzzy("Quantidade de containers ativos");
        this.qtdContainers.add('eficiente', 0, 0, 1, 3);
        this.qtdContainers.add('medio', 2, 3, 4, 5);
        this.qtdContainers.add('deficiente', 3, 5, 6, 6);

        this.custoCriacao = new Fuzzy("Custo estimado de geração de um container");
        this.custoCriacao.add('eficiente', 0, 0, 20, 35);
        this.custoCriacao.add('medio', 30, 40, 55, 70);
        this.custoCriacao.add('deficiente', 60, 90, 120, 120);
    }

    run(){
        console.log(this.memoMax.fuzzify(657));
        console.log(this.memoMed.fuzzify(134));
        console.log(this.cpuMed.fuzzify(43));
        console.log(this.qtdContainers.fuzzify(3));
        console.log(this.custoCriacao.fuzzify(74));
    }
}