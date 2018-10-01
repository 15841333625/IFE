// 根据单选框中内容展示表格
(function() {
    // 获得选中的地区
    var locations = document.getElementsByName("location");
    for(var i = 0; i < locations.length; i ++) {
        locations[i].addEventListener('click', function() {
            renderTable();
        })
    }
    // 获得选中的产品
    var products = document.getElementsByName("product");
    for(var i = 0; i < products.length; i ++) {
        products[i].addEventListener('click', function() {
            renderTable();
        })
    }

    // 根据选中的地区和产品获得数据
    function getData() {
        var lvalue = "", pvalue = "";
        for(var i = 0; i < locations.length; i ++) {
            if(locations[i].checked) {
                lvalue = locations[i].value;
            }
        }
        for(var i = 0; i < products.length; i ++) {
            if(products[i].checked) {
                pvalue = products[i].value;
            }
        }
        var list = [];

        for(var i = 0; i < sourceData.length; i ++) {
            if(sourceData[i].region === lvalue && sourceData[i].product === pvalue) {
                list.push(sourceData[i]);
            }
        }

        return list;
    }

    // 根据获得的数据渲染表格
    function renderTable() {
        var list = getData();

        var wrap = document.getElementById("table-wrapper");
        wrap.innerHTML = "";

        var table = document.createElement("table");
        wrap.append(table);

        var thd = "<thead>" +
                        "<th>地区</th>" +
                        "<th>商品</th>" + 
                        "<th>1月</th>" +
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

        for(var i = 0; i < list.length; i ++) {
            var tr = document.createElement("tr");
            var tdd = "";
            tdd = "<td>" + list[i].region + "</td> <td>" + list[i].product + "</td>";

            for(var j = 0; j < list[i].sale.length; j ++) {
                tdd = tdd + "<td>" + list[i].sale[j] + "</td>";
            }

            tr.innerHTML = tdd;
            tbd.append(tr);
        }

        table.append(tbd);
    }
})();