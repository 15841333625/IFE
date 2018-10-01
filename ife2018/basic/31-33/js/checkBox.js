function CheckBox(container, name, values) {
    // 生成全选框
    this.all_check = document.createElement("input");
    this.container = container;
    
    // 初始化复选框
    this.init = function() {
        // 添加复选框元素
        for(var i = 0; i < values.length; i ++) {
            var lb = document.createElement("lable");
            
            var cb = document.createElement("input");
            cb.setAttribute("type", "checkbox");
            cb.setAttribute("name", name);
            cb.setAttribute("value", values[i]);
            cb.setAttribute("id", name + i);

            var text = document.createTextNode(values[i]);
            lb.append(cb);
            lb.append(text);
            lb.setAttribute("for", name + i)
            container.append(lb);
        }
        
        // 添加全选选项
        var lab = document.createElement("lable");
            
        this.all_check.setAttribute("type", "checkbox");
        this.all_check.setAttribute("name", name);
        this.all_check.setAttribute("value", "");
        this.all_check.setAttribute("id", name + "-all-check")
        var text = document.createTextNode("全选");
        lab.append(this.all_check);
        lab.append(text);
        lab.setAttribute("for", name + "-all-check");
        container.append(lab);
    }
    
    // 添加全选监听事件
    this.all_check.addEventListener('click', function() {
        var checkboxes = container.querySelectorAll('input[type=checkbox]');

        if(this.checked) {
            for(var i = 0; i < checkboxes.length; i ++) {
                if(checkboxes[i].checked === false) 
                    checkboxes[i].checked = true;
            }
        } else {
            for(var i = 0; i < checkboxes.length; i ++) {
                if(checkboxes[i].checked === true) 
                    checkboxes[i].checked = false;
            }
        }
    });
    
    // 添加普通复选框监听事件，若未选中，则全选未选中
    var that = this;
    this.container.addEventListener('click', function(event) {
        var target =  event.target;
        if(target.nodeName.toLowerCase() === 'input') {
            if(target.checked === false) {
                that.all_check.checked = false;
            }
        }
    });
}