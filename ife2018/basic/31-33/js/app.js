window.onload = (function() {
    // 实例化复选框
    var rrw = document.getElementById("region-radio-wrapper");
    var crrw = new CheckBox(rrw, "regions", ["华东", "华北", "华南"]);
    crrw.init();

    var prw = document.getElementById("product-radio-wrapper");
    var cprw = new CheckBox(prw, "products", ["手机", "笔记本", "智能音箱"]);
    cprw.init();
})();