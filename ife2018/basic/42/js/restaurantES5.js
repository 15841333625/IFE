// 餐厅类
function Restaurant(o) {
    this.cash = o.cash || 0;
    this.seats = o.seats || 0;
    this.staff = o.staff || [];
}
Restaurant.prototype.hire = function(o) {
    if(o instanceof Staff) {
        this.staff.push(o);
    }
}
Restaurant.prototype.fire = function(o) {
    for(var i = 0; i < this.staff.length; i ++) {
        if(this.staff[i].equals(o)) {
            this.staff.splice(i, 1);
            i --;
        }
    }
}

// 职员类
function Staff(name, salary) {
    this.id = 0;
    this.name = name;
    this.salary = salary;
}
Staff.prototype.work = function(){
    console.log("staff.work()");
}
// 判断两个职员是否相等
Staff.prototype.equals = function(o) {
//    console.log(Object.prototype.toString.call(this));
//    console.log(Object.prototype.toString.call(o));
    
    console.log(this.constructor);
    console.log(o.constructor);
    
    if(this.constructor === o.constructor && this.name === o.name) {
        return true;
    } else return false;
}

// 服务员类 组合方式继承职员类
function Waiter(name, salary) {
    Staff.call(this, name, salary);
}
Waiter.prototype = new Staff();
Waiter.prototype.constructor = Waiter;

Waiter.prototype.work = function() {
    var arg = arguments;
    // 判断参数是否为数组
    if(arguments[0] instanceof Array) {
        console.log("记录");
    } else {
        console.log("上菜");
    }
}

// 厨师类 组合方式继承职员类
function Cook(name, salary) {
    Staff.call(this, name, salary);
}
Cook.prototype = new Staff();
Cook.prototype.constructor = Cook;

Cook.prototype.work = function() {
    console.log("烹饪");
}

// 顾客类
function Customer() {}
Customer.prototype.order = function() {
    console.log("点菜");
}
Customer.prototype.eat = function() {
    console.log("吃");
}

// 菜品类
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost || 0;
    this.price = price || 0;
}