(function () {
    // 获得所有选中的复选框
    var checkboxes = document.querySelectorAll("input[name=regions], input[name=products]");
    
    // 选中的复选框有改变则重新渲染表格
    for(var i = 0; i < checkboxes.length; i ++) {
        checkboxes[i].addEventListener('click', function() {
            renderTable();
        });
    }
    
    // 获得选中的数据
    function getData() {
        var list = [];
        var rs = document.querySelectorAll("input[name='regions']:checked");
        var ps = document.querySelectorAll("input[name='products']:checked");
        
        for(var i = 0; i < rs.length; i ++) {
            for(var k = 0; k < ps.length; k ++) {
                for(var j = 0; j < sourceData.length; j ++) {
                    if(rs[i].value === sourceData[j].region && ps[k].value === sourceData[j].product ) {
                        list.push(sourceData[j]);
                    }
                }
            }
        }        
        
        return list;
    }
    
    // 渲染表格
    function renderTable() {
        // 获得数据
        var list = getData();
        // 获得选中的复选框
        var rs = document.querySelectorAll("input[name='regions']:checked");
        var ps = document.querySelectorAll("input[name='products']:checked");
        
        // 渲染的容器
        var wrap = document.getElementById("table-wrapper");
        wrap.innerHTML = "";

        // 生成table的thead
        var table = document.createElement("table");
        wrap.append(table);

        var thd = "<thead>";
        // 如果选中的地区数多于产品数，则按照产品渲染，反之按照地区渲染
        if(rs.length >= ps.length) {
            thd = thd + "<th>商品</th>" + 
                        "<th>地区</th>";
        } else {
            thd = thd + "<th>地区</th>" +
                        "<th>商品</th>";
        }
        thd = thd + "<th>1月</th>" +
                    "<th>2月</th>" +
                    "<th>3月</th>" +
                    "<th>4月</th>" +
                    "<th>5月</th>" +
                    "<th>6月</th>" +
                    "<th>7月</th>" +
                    "<th>8月</th>" +
                    "<th>9月</th>" +
                    "<th>10月</th>" +
                    "<th>11月</th>" +
                    "<th>11月</th>" +
                "</thead>";
        table.innerHTML = thd;
        
        var tbd = document.createElement("tbody");
        
        // 如果选择的地区的选项比产品的多，则按产品展示
        if(rs.length >= ps.length) {
            // 按照选中的产品循环，获得每个产品在不同地区的数据
            for(var i = 0; i < ps.length; i ++) {
                var pname = ps[i].value;
                // 存放同一个产品不同地区数据
                var rlist = [];
                
                for(var j = 0; j < list.length; j ++) {
                    if(list[j].product === pname) {
                        rlist.push(list[j]);
                    }
                }
                
                // 如果产品名不为空，按照地区生成表格一行
                if(pname !== "") {
                    for(var j = 0; j < rlist.length; j ++) {
                        var tr = document.createElement("tr");
                        var tdd = "";
                        
                        // 如果是第一行，展示产品名，rowspan为地区的数量
                        if(j === 0) {
                            tdd = "<td rowspan=" + rlist.length + ">" + pname + "</td>";
                        }
                        tdd = tdd + "<td>" + rlist[j].region + "</td>";

                        for(var k = 0; k < rlist[j].sale.length; k ++) {
                            tdd = tdd + "<td>" + rlist[j].sale[k] + "</td>";
                        }

                        tr.innerHTML = tdd;
                        tbd.append(tr);
                    }
                }
            }
            // 否则按产品展示
        } else {
            for(var i = 0; i < rs.length; i ++) {
                var rname = rs[i].value;
                var plist = [];
                
                for(var l = 0; l < list.length; l ++) {
                    if(list[l].region === rname) {
                        plist.push(list[l]);
                    }
                }
                
                if(rname !== "") {
                    for(var j = 0; j < plist.length; j ++) {
                        var tr = document.createElement("tr");
                        var tdd = "";
                        
                        if(j === 0) {
                            tdd = "<td rowspan=" + plist.length + ">" + rname + "</td>";
                        }
                        tdd = tdd + "<td>" + plist[j].product + "</td>";

                        for(var k = 0; k < plist[j].sale.length; k ++) {
                            tdd = tdd + "<td>" + plist[j].sale[k] + "</td>";
                        }

                        tr.innerHTML = tdd;
                        tbd.append(tr);
                    }
                }
            }
        }
        
        table.append(tbd);
        
        // tr添加监听事件，渲染图表
        var trs = document.getElementsByTagName('tr');
        
        for(var i = 0; i < trs.length; i ++) {
            
            trs[i].addEventListener('mouseover', function() {
                var data = [];
                
                var tds = this.getElementsByTagName('td');
                for(var j = 0; j < tds.length; j ++) {
                    
                    var d = parseFloat(tds[j].innerText);
                    
                    if(isNaN(d) === false)
                        data.push(d);
                }
                
                renderBarChart(data);
            });
        }
    }
})();