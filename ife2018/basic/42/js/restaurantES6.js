class Staff {
    constructor(name, salary) {
        this.id = 0;
        this.name = name;
        this.salary = salary;
    }
    work() {
        console.log("staff.work()");
    }
    equals(o) {
        if(this.constructor === o.constructor && this.name === o.name) {
            return true;
        } else return false;
    }
}

class Waiter extends Staff{
    constructor(name, salary) {
        super(name, salary);
    }
    work() {
        var arg = arguments;
        // 判断参数是否为数组
        if(arguments[0] instanceof Array) {
            console.log("记录");
        } else {
            console.log("上菜");
        }
    }
}

class Cook extends Staff{
    constructor(name, salary) {
        super(name, salary);
    }
    work() {
        console.log("烹饪");
    }
}

class Restaurant {
    constructor(o) {
        this.cash = o.cash || 0;
        this.seats = o.seats || 0;
        this.staff = o.staff || [];
    }
    hire(o) {
        if(o instanceof Staff) {
            this.staff.push(o);
        }
    }
    fire(o) {
        for(var i = 0; i < this.staff.length; i ++) {
            if(this.staff[i].equals(o)) {
                this.staff.splice(i, 1);
                i --;
            }
        }
    }
}

class Customer {
    order() {
        console.log("点菜");
    }
}

class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost || 0;
        this.price = price || 0;
    }
}