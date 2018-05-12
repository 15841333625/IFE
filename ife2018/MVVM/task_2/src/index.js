import san from 'san';
var MyApp = san.defineComponent({
    template: '<p>Hello {{name}}!</p>',

    initData: function () {
        return {
            name: 'World'
        };
    }
});


var myApp = new MyApp();
myApp.attach(document.body);