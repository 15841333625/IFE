var wrap = document.getElementById('table-wrapper');
// 添加table监听事件
wrap.addEventListener('mouseout', function(event) {
var target = event.target;
var flag2 = 0;

while(target !== wrap) {
    if(target.nodeName.toLowerCase() !== 'table') {
        target = target.parentNode; 
        flag2 = 1;
    } else {
        break;
    }
}
if(flag2 === 1) {
    var data = [];
    var tdata = [];
    var trs = target.getElementsByTagName('tr');
    for(var i = 0; i < trs.length; i ++) {
        tdata = [];
        var tds = trs[i].getElementsByTagName('td');

        for(var j = 0; j < tds.length; j ++) {
            var d = parseFloat(tds[j].innerText);
            if(!isNaN(d)) {
                tdata.push(d);
            }
        }
        data.push(tdata);
    }

    renderLineCharts(data);    
}
});

// tr添加监听事件，渲染图表
wrap.addEventListener('mouseover', function(event) {
var target = event.target;
var flag = 0;

while(target !== wrap) {
    if(target.nodeName.toLowerCase() !== 'tr') {
        target = target.parentNode;
        flag = 1; 
    } else {
        break;
    }
}
if(flag === 1) {
    var data = [];

    var tds = target.getElementsByTagName('td');
    for(var j = 0; j < tds.length; j ++) {

        var d = parseFloat(tds[j].innerText);

        if(isNaN(d) === false)
            data.push(d);
    }

    renderBarChart(data);
    renderLineChart(data);
}
});