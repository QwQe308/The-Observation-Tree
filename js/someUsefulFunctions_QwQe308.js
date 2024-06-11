//快捷调用+提高运算速度
var zero = new Decimal(0)
var one = new Decimal(1)
var two = new Decimal(2)
var three = new Decimal(3)
var four = new Decimal(4)
var five = new Decimal(5)
var six = new Decimal(6)
var seven = new Decimal(7)
var eight = new Decimal(8)
var nine = new Decimal(9)
var ten = new Decimal(10)
//快捷定义
function n(num) {
    return new Decimal(num)
}
//检测旁边的升级是否被购买
function checkAroundUpg(UPGlayer, place) {
    place = Number(place)
    return hasUpgrade(UPGlayer, place - 1) || hasUpgrade(UPGlayer, place + 1) || hasUpgrade(UPGlayer, place - 10) || hasUpgrade(UPGlayer, place + 10)
}
//指数软上限
function powsoftcap(num, start, power) {
    if (num.gt(start)) {
        num = num.root(power).mul(start.pow(one.sub(one.div(power))))
    }
    return num
}
//e后数字开根
function expRoot(num, root) {
    return ten.pow(num.log10().root(root))
}
//e后数字乘方
function expPow(num, pow) {
    return ten.pow(num.log10().pow(pow))
}
//e后数字指数软上限
function expRootSoftcap(num, start, power) {
    if (num.lte(start)) return num;
    num = num.log10(); start = start.log10()
    return ten.pow(num.root(power).mul(start.pow(one.sub(one.div(power)))))
}
//进行模运算
function mod(num1, num2) {
    return num1.sub(num1.div(num2).floor().mul(num2))
}
//修改class属性
function setClass(id, toClass = []) {
    var classes = ""
    for (i in toClass) classes += " " + toClass[i]
    if (classes != "") classes = classes.substr(1)
    document.getElementById(id).className = classes
}
//快速创建sub元素
function quickSUB(str) {
    return `<sub>${str}</sub>`
}
//快速创建sup元素
function quickSUP(str) {
    return `<sup>${str}</sup>`
}
//快速给文字上色
function quickColor(str, color) {
    return `<span style='color:${color}'>${str}</span>`
}
//对象深复制
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy(obj[key]);   //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
//深刷新Decimal对象
function refreshDecimal(obj) {
    for (i in obj) {
        if (typeof obj[i] !== "object") continue
        if (obj[i] === null) continue
        if (typeof obj[i] === "object" && obj[i].sign !== undefined) obj[i] = new Decimal(HARDformat(obj[i]));
        else if (typeof obj[i] === "object") refreshDecimal(obj[i])
    }
};
//强制以BE能接受的形式format对象(?)
function HARDformat(data) {
    return (data.sign === -1 ? "-" : "") + "(e^" + data.layer + ")" + data.mag;
}

function layerDisplay(id){
    if(tmp[id].layerShown===undefined){
        return true
    }
    return tmp[id].layerShown
}

function layerDisplayTotal(id){
    for(i in id){
        let a = layerDisplay(id[i])
        if(a==true){
            return true
        }
    }
}
//种子随机
function seedRandom(seed){
    return (seed * 9301 + 49297) % 233280
}
//进度条多层颜色
/*
fillStyle(){
    return {"background-color": colorBar(***层数***.add(1))}
},
baseStyle(){
    return {"background-color": colorBar(***层数***)}
},
textStyle(){
    return {"color": color(layers[this.layer].bars.progress.colorLayer().add(2))}
},
*/
var colorList = ['grey','red','lightblue','rgb(0,50,0)','pink','blue','purple','yellow',"white"]
function colorBar(num){
    num = num.toNumber()%colorList.length
    return colorList[num]
}