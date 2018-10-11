var dishes = [];
var dish1 = new Dish("宫保鸡丁", 20, 30);
var dish2 = new Dish("可乐鸡翅", 20, 25);
var dish3 = new Dish("麻辣香锅", 25, 30);
dishes.push(dish1);
dishes.push(dish2);
dishes.push(dish3);

var customers = [];
var c = null;
for(var i = 0; i < 3; i ++) {
    c = new Customer(i);
    customers.push(c);
}

var name = null;
for(var i = 0; i < customers.length; i ++) {
    // 顾客点餐
    name = customers[i].order(dishes);
    
    var cook = Cook.getInstance("Tony", 10000)
    
    // 服务员通知厨师做菜
    if(Cook.getInstance("Tony", 10000)
       .cook(Waiter.getInstance("Tom", 8000)
             .service(name))) {
        if(Waiter.getInstance("Tom", 8000)
           .serving(name)){
            customers[i].eat();
        }
    }
    
    console.log("顾客" + i + "走了");
}