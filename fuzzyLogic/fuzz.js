import Trapezoid from "./trapezoid";

export default class Fuzz{
    constructor(title, p1, p2, p3, p4){
        this.title = title;
        this.curve = new Trapezoid(p1, p2, p3, p4); 
    }

    getAxis(){
        return this.curve.getAxis();
    }

    getTitle(){
        return this.title;
    }

    getFuzz(value){
        var result = this.curve.calculate(value);        
        return result;
    }

    getDefuzz(value){
        var result = this.curve.reverse(value);
        return result;
    }
}