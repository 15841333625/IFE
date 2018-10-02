// 绘制柱状图
function renderBarChart(data) {
    // 获得容器和容器的宽高
    var container = document.getElementById("bar-chart");
    container.innerHTML = "";
    var cheight = container.clientHeight;
    var cwidth = container.clientWidth;

    // 定义横纵轴的宽高
    var yheight = cheight * 0.8;
    var xwidth = cwidth * 0.8;
    var maxHeight = yheight - 10;

    // 定义横纵轴相对容器的位移
    var yoffhei = (cheight - yheight) / 2;
    var xoffwid = (cwidth - xwidth) / 2;

    // 定义柱子的宽度和柱子间间隔的宽度
    var bwidth = xwidth / 12 * 0.6;
    var bspace = xwidth / 12 - bwidth;

    // 获得数据的最大值
    var maxData = getMax();
    // 根据最大值计算纵轴最大值和y轴间距，Math.ceil 向上取整
    var maxYScale = Math.ceil(maxData / 50) * 50;
    var yspace = maxYScale / 5;

    // 创建svg画布
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width", cwidth);
    svg.setAttribute("height", cheight);
    
    // 获取数据最大值
    function getMax() {
        var max = 0;
        
        for(var i = 0; i < data.length; i ++) {
            if(data[i] > max) {
                max = data[i];
            }
        }
        
        return max;
    }

    // 绘制坐标轴
    function setAxis() {
        // 创建纵坐标轴
        var yaxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        yaxis.setAttribute("x1", xoffwid);
        yaxis.setAttribute("y1", yheight + yoffhei);
        yaxis.setAttribute("x2", xoffwid);
        yaxis.setAttribute("y2", yoffhei);
        yaxis.setAttribute("style", "stroke: #000; stroke-width:1");

        // 创建横坐标轴
        var xaxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        xaxis.setAttribute("x1", xoffwid);
        xaxis.setAttribute("y1", yheight + yoffhei);
        xaxis.setAttribute("x2", xoffwid + xwidth);
        xaxis.setAttribute("y2", yheight + yoffhei);
        xaxis.setAttribute("style", "stroke: #000; stroke-width:1");

        svg.append(yaxis);
        svg.append(xaxis);

        // 绘制横坐标刻度
        // 计算刻度的间距
        var space = xwidth / 12;
        var start = space / 2;
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        for(var i = 0; i < 12; i ++) {
            // 横坐标刻度
            var scale = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            // 横坐标角标
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.textContent = (i + 1).toString() + "月";

            var x = i * space + start + xoffwid;

            scale.setAttribute("x1", x);
            scale.setAttribute("y1", yheight + yoffhei);
            scale.setAttribute("x2", x);
            scale.setAttribute("y2", yheight + yoffhei + 2);
            scale.setAttribute("style", "stroke: #000; stroke-width:1");

            text.setAttribute("x", x - 8);
            text.setAttribute("y", yheight + yoffhei + 15);
            text.setAttribute("font-size", 10);
            text.setAttribute("style", "fill: #414141;");

            g.append(scale);
            g.append(text);
        }

        svg.append(g);

        // 绘制纵坐标轴
        // 计算纵刻度的间距
        space = maxHeight / 5;
        start = yheight + yoffhei;
        g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        for(var i = 0; i < 6; i ++) {
            // 纵坐标刻度
            var scale = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            // 背景线
            var sline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            // 纵坐标角标
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.textContent = i * yspace;

            var y = start - i * space;

            scale.setAttribute("x1", xoffwid);
            scale.setAttribute("y1", y);
            scale.setAttribute("x2", xoffwid - 2);
            scale.setAttribute("y2", y);
            scale.setAttribute("style", "stroke: #000; stroke-width:1");

            sline.setAttribute("x1", xoffwid);
            sline.setAttribute("y1", y);
            sline.setAttribute("x2", xoffwid + xwidth);
            sline.setAttribute("y2", y);
            sline.setAttribute("style", "stroke: #a6aa9c; stroke-width:1");

            text.setAttribute("x", xoffwid - 20);
            text.setAttribute("y", y + 3);
            text.setAttribute("font-size", 10);
            text.setAttribute("style", "fill: #414141;");

            g.append(scale);
            g.append(sline);
            g.append(text);
        }
        svg.append(g);
    }

    // 绘制柱状图
    function setBars() {
        // 计算单位高度
        var unitH = maxHeight / maxYScale;
        // 起始x轴位移
        var start = xoffwid + bspace / 2;
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        for(var i = 0; i < data.length; i ++) {
            // 计算柱子的高度
            var bheight = unitH * data[i];
            
            var bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            
            bar.setAttribute("width", bwidth);
            bar.setAttribute("height", bheight);
            bar.setAttribute("x", start + bspace * i + bwidth * i);
            bar.setAttribute("y", yheight + yoffhei - bheight);
            bar.setAttribute("style", "fill: #ebbb91; stroke-width:1; stroke: #f08181");
            
            g.append(bar);
        }
        
        svg.append(g);
    }

    setBars();
    setAxis();

    container.append(svg);
}
