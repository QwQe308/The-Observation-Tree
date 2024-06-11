let lores = {
    1:{
        text(){return "你的任务是测试这些奇怪的物品,并且了解如何利用它们.祝你好运."},
        unl(){return player.tab == "i"},
    },
    2:{
        text(){return "看不明白吗?我们新推出了“计数器”!一个准确的数字会帮到你的吧...大概?"},
        unl(){return player.i.points.gte(5)},
    },
    3:{
        text(){return "特别优惠：买一送一!"},
        unl(){return hasUpgrade('i',11)},
    },
    4:{
        text(){return "这可不行.你才刚开始呢."},
        unl(){return hasUpgrade('i',12)},
    },
    5:{
        text(){return "有做笔记的习惯的话大概会好一点...应该吧?"},
        unl(){return hasUpgrade('i',13)},
    },
    6:{
        text(){return "有了笔记之后确实太简单了."},
        unl(){return hasUpgrade('i',14)},
    },
}