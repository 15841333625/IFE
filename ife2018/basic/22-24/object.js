var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}

// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(tree, name) {
    if(tree.hasOwnProperty('left')) {
        findIdByName(tree.left, name);
    }
    if(tree.hasOwnProperty('right')) {
        findIdByName(tree.right, name);
    }
    if(tree.name === name) {
        console.log(tree.id);
    }
}

findIdByName(tree, "Carl");

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(tree, id) {
    if(tree.hasOwnProperty('left')) {
        findNameById(tree.left, id);
    }
    if(tree.hasOwnProperty('right')) {
        findNameById(tree.right, id);
    }
    if(tree.id === id) {
        console.log(tree.name);
    }
}
findNameById(tree, 5);

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR(tree) {
    console.log(tree.name);
    if(tree.hasOwnProperty('left')) {
        getListWithDLR(tree.left);
    }
    if(tree.hasOwnProperty('right')) {
        getListWithDLR(tree.right);
    }
}
console.log("前序遍历：");
getListWithDLR(tree);

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR(tree) {
    if(tree.hasOwnProperty('left')) {
        getListWithLDR(tree.left);
    }
    console.log(tree.name);
    if(tree.hasOwnProperty('right')) {
        getListWithLDR(tree.right);
    }
}
console.log("中序遍历：");
getListWithLDR(tree);

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD(tree) {
    if(tree.hasOwnProperty('left')) {
        getListWithLRD(tree.left);
    }
    if(tree.hasOwnProperty('right')) {
        getListWithLRD(tree.right);
    }
    console.log(tree.name);
}
console.log("后序遍历：");
getListWithLRD(tree);