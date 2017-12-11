export default class Trapezoid{
    constructor(p1, p2, p3, p4){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.axis = [this.p1,this.p2,this.p3,this.p4];
    }

    getAxis(){
        return this.axis;
    }

    calculate(value){
        if ((value < this.p1) || (value > this.p4)) return 0;
        if ((value == 0) && (this.p2 == 0)) return 1;
        if ((value >= this.p1) && (value <= this.p2)) return (value / this.p2);
        if ((value >= this.p2) && (value <= this.p3)) return 1;
        if ((value > this.p3) && (value <= this.p4)){
            var ang = -1 / (this.p4 - this.p3);
            var lin = -1 * ((this.p3 * ang) - 1);
            var result = (ang * value) + lin;
            if (result > 1) return 1;
            return result;
        }
        return "error";
    }

    reverse(value){
        return value * this.p2; 
    }
}