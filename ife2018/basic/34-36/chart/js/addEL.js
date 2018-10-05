// 添加监听事件

var wrap = document.getElementById('table-wrapper');
// 添加table监听事件
wrap.addEventListener('mouseout', function(event) {
    var target = event.target;
    var flag2 = 0;

    while(target !== wrap) {
        if(target.nodeName.toLowerCase() !== 'table') {
            target = target.parentNode; 
        } else {
            flag2 = 1;
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
        } else {
            flag = 1; 
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

var oldData;
// td添加监听事件，点击变化为input
wrap.addEventListener('click', function(event) {
    var target = event.target;
    var flag = 0;

    while(target !== wrap) {
        if(target.nodeName.toLowerCase() !== 'td') {
            target = target.parentNode; 
        } else {
            flag = 1;
            break;
        }
    }
    if(flag === 1) {
        if(target.className !== 'selected') {
            reback();
        }
        
        var d = parseFloat(target.innerText);
        
        if(!isNaN(d)) {
            oldData = d;
            
            target.innerHTML = "<input class='editNum' value='" + d + "' />" +
                "<button class='cancBtn'> 取消 </button>" +
                "<button class='confBtn'> 确认 </button>";
            target.className = "selected";
        }
    }
});

// 点击界面任一点则取消编辑状态
document.addEventListener('click', function(event) {
    var target = event.target;
    
    while(target !== null && target.nodeName.toLowerCase() !== 'html') {
        if(target.nodeName.toLowerCase() !== "td") {
            target = target.parentNode;
        } else break;
    }
    
    if(target !== null) {
        if(target.nodeName.toLowerCase() !== "td") {
            reback();
        }
    }
});

// 恢复旧数据
function reback() {
    var table = document.querySelector("table");
    
    var tds = table.getElementsByTagName("td");
    
    for(var i = 0; i < tds.length; i ++) {
        if(tds[i].className === "selected"){
            tds[i].innerHTML = oldData + "<img class='edit' src='./img/edit.ico'>";
            tds[i].className = "data";
        }
    }
}

// 恢复
function renew(e) {
    var data = e.querySelector(".editNum").value;
    
    if(isNaN(parseFloat(data))) {
        alert("请输入数字");
    } else {
        e.innerHTML = data + "<img class='edit' src='./img/edit.ico'>";
        e.className = "data";
    }
}

// 确认按钮添加点击事件
wrap.addEventListener('click', function(event) {
    var target = event.target;
    if(target.className === 'confBtn') {
        renew(target.parentNode);
    }
})
// 取消按钮添加点击事件
wrap.addEventListener('click', function(event) {
    var target = event.target;
    if(target.className === 'cancBtn') {
        reback();
    }
})