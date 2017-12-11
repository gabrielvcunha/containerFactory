import Fuzz from "./fuzz";

export default class Fuzzy{
    constructor(title){
        this.title = title;
        this.curves = new Array();
        this.fuzzResult = new Array();
    }

    add(title, p1, p2, p3, p4){
        var fuzz = new Fuzz(title, p1, p2, p3, p4);
        this.curves.push(fuzz);
    }

    fuzzify(value){
        for(let curve of this.curves){
            this.fuzzResult.push(
                {
                    title:curve.getTitle(), 
                    axis:curve.getAxis(),
                    fuzzy:curve.getFuzz(value)
                }
            );
        }
        return this.fuzzResult;
    }

    defuzzify(fuzz){
        return this.curves[fuzz[0]].getDefuzz(fuzz[1]);
    }
}