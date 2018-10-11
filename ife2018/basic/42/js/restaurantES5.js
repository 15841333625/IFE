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
    if(this.constructor === o.constructor && this.name === o.name) {
        return true;
    } else return false;
}

// 服务员类 组合方式继承职员类
var Waiter = function(name, salary) {
    Staff.call(this, name, salary);
}
Waiter.prototype = new Staff();
Waiter.prototype.constructor = Waiter;

// 服务员为顾客点餐，通知厨师成功
Waiter.prototype.service = function(dish, fn) {
    // 判断参数是否为数组
    if(dish instanceof Array) {
        console.log("记录菜品");
        for(var e in dish) {
            console.log("通知厨师做" + e);
        }
    } else {
        console.log("通知厨师做" + dish);
    }
    
    fn();
}

// 服务员上菜
Waiter.prototype.serving = function(name, fn) {
    console.log("服务员上菜" + name);
    fn();
}

// 利用闭包的特性创建单例,同时符合惰性单例的特性
Waiter.getInstance = (function(name, salary) {
    var instance;
    return function(name, salary) {
        if(!instance) {
            instance = new Waiter(name, salary);
            console.log("A waiter has been created.")
        }
        return instance;
    }
})();

// 厨师类 组合方式继承职员类
var Cook = function(name, salary) {
    Staff.call(this, name, salary);
}
Cook.prototype = new Staff();
Cook.prototype.constructor = Cook;

Cook.prototype.callWaiter = function(name) {
    console.log("通知服务员" + name + "做好了");
}
Cook.prototype.cook = function(name, fn) {
    console.log("厨师烹饪" + name + "菜");
    this.callWaiter(name);
    fn();
}

// 利用闭包的特性创建单例,同时符合惰性单例的特性
Cook.getInstance = (function(name, salary) {
    var instance;
    return function(name, salary) {
        if(!instance) {
            instance = new Cook(name, salary);
            console.log("A cook has been created.")
        }
        return instance;
    }
})();

// 顾客类
function Customer(id) {
    this.id = id;
}
// 顾客根据菜单随机点餐, 返回所点菜名
Customer.prototype.order = function(dishes) {
    var len = dishes.length;
    
    var orderone = parseInt(Math.random()*len, 10);
    var name = dishes[orderone].name;
    
    console.log("顾客" + this.id + "来了，点" + name);
    
    return name;
}
Customer.prototype.eat = function() {
    console.log("顾客" + this.id + "吃");
}

// 菜品类
function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost || 0;
    this.price = price || 0;
}