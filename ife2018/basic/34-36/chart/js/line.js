// 绘制折线图
function renderLineChart(data) {
    // 获得容器和容器的宽高
    var container = document.getElementById("line-chart");
    container.innerHTML = "";
    var cheight = container.clientHeight;
    var cwidth = container.clientWidth;
    
    // 创建canvas画布
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", cwidth);
    canvas.setAttribute("height", cheight);
    
    // 定义坐标轴的宽高
    var xAxisWidth = cwidth * 0.8;
    var yAxisHeight = cheight * 0.8;
    
    // 定义坐标轴原点坐标
    var xOffWidth = (cwidth - xAxisWidth) / 2;
    var yOffHeight = (cheight - yAxisHeight) / 2 + yAxisHeight;
    
    // 计算横轴间距
    var xspace = xAxisWidth / 12;
    
    // 定义纵坐标最大值
    var maxData = getMax();    
    // 根据最大值计算纵轴最大值和y轴间距，Math.ceil 向上取整
    var maxYScale = Math.ceil(maxData / 50) * 50;
    var yspace = (yAxisHeight - 10) / 5;
    
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
    
    // 获得渲染上下文
    var ctx = canvas.getContext('2d');
    
    // 绘制坐标轴
    function setAxises() {
        // 绘制横坐标轴
        ctx.moveTo(xOffWidth, yOffHeight);
        ctx.lineTo(xOffWidth + xAxisWidth, yOffHeight);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // 绘制纵坐标轴
        ctx.moveTo(xOffWidth, yOffHeight);
        ctx.lineTo(xOffWidth, yOffHeight - yAxisHeight);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // 绘制横坐标刻度
        var xstart = xOffWidth + xspace / 2;

        for(var i = 0; i < 12; i ++) {
            // 绘制刻度
            ctx.beginPath();
            ctx.moveTo(xstart + i * xspace, yOffHeight);
            ctx.lineTo(xstart + i * xspace, yOffHeight + 3);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.stroke();

            // 绘制角标
            ctx.fillText((i+1).toString() + "月", xstart + i * xspace - 8, yOffHeight + 15);
            ctx.font = "8px";

        }

        // 绘制纵坐标刻度
        var ystart = yOffHeight;

        for(i = 0; i < 6; i ++) {
            // 绘制刻度
            ctx.beginPath();
            ctx.moveTo(xOffWidth, ystart - yspace * i);
            ctx.lineTo(xOffWidth - 3, ystart - yspace * i);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000";
            ctx.stroke();

            // 绘制角标
            ctx.fillText(i * (maxYScale / 5), xOffWidth - 25, ystart - yspace * i + 3);
            ctx.font = "8px";

            if(i !== 0) {
                // 绘制背景线
                ctx.beginPath();
                ctx.moveTo(xOffWidth, ystart - yspace * i);
                ctx.lineTo(xOffWidth + xAxisWidth, ystart - yspace * i);
                ctx.strokeStyle = "#a6aa9c";
                ctx.lineWidth = 1;
                ctx.stroke();   
            }
        }
    }
   
    // 绘制折线图
    function setLines() {
        var unit = (yAxisHeight - 10) / maxYScale;
        var xstart = xOffWidth + xspace / 2
        var ystart = yOffHeight;
        
        // 绘制折线
        ctx.beginPath();
        ctx.moveTo(xstart, ystart - data[0] * unit);
        for(var i = 1; i < data.length; i ++) {
            ctx.lineTo(xstart + i * xspace, ystart - data[i] * unit);
        }
        ctx.strokeStyle = "#f08181";
        ctx.lineWidth = 1;
        ctx.stroke();  
        
        // 绘制点
        for(i = 0; i < data.length; i ++) {
            ctx.beginPath();
            ctx.arc(xstart + i * xspace, ystart - data[i] * unit, 3, 0, 2*Math.PI);
            ctx.strokeStyle = "#be3737";
            ctx.fillStyle = "#e6e7e5";
            ctx.fill();
            ctx.stroke();
        }
    }
    
    setAxises();
    setLines();
    
    container.append(canvas);
}