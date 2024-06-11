//不要偷看源码哦~会被剧透的
function givePoint(amount,extraInfo){
    let mult = getPointMult(extraInfo)
    player.i.points = player.i.points.add(mult.mul(amount)).max(0)
}

function getPointMult(extraInfo){
    let mult = n(1)
    mult = mult.mul(player.i.a2.div(4).add(1))
    mult = mult.mul(player.i.a3.add(1).div(3))
    if(player.i.a3.gte(3)) mult = mult.mul(player.i.a3.add(1).div(3).pow(0.5))
    if(player.i.b3.lte(10) && hasUpgrade("i",14)) mult = mult.mul(2)
    return mult
}

function clickCheck(id){
    if(addNote){
        if(addNote!==true) player.i.notes[addNote] = textarea.value
        addNote = id
        textarea.value = player.i.notes[addNote]?player.i.notes[addNote]:""
        textarea.style.display = "block"
    }
    if(player.i.b3.gte(12)) givePoint(-1)
    if(player.i.lastClicked === id && hasUpgrade("i",14)) player.i.b3 = player.i.b3.add(1).min(12)
    else player.i.b3 = player.i.b3.sub(1).max(0)

    if(id != '21') player.i.lastClickedB21 = id
    player.i.lastClicked = id
    player.i.b1 = n(player.i.b1.add(0.75).toNumber()%9)
}

function holdCheck(id){
}

function idToName(id){
    return alphabetList[id[0]]+id[1]
}

function updateNote(){
    if(typeof addNote === "boolean") return
    player.i.notes[addNote] = textarea.value
}

function getGameSpeed(){
    let spd = 1
    if(player.i.b2state) spd /= 3
    if(player.i.b2state == "hyper") spd *= 9
    spd *= player.i.a4.min(40).toNumber()/25+1
    return spd
}

const alphabetList = [null,'a','b','c','d','e']
let textarea = null
let addNote = false
let globalDiff = 0
let gamespeed = 1

addLayer("i", {
    symbol: "i",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            lores:[],

            a1: n(0),
            a2: n(0),
            a3: n(2),
            a4: n(0),
            
            b1: n(10),
            b2: n(0),
            b2state: false,
            b2holdTimer: n(0),
            b3: n(0),

            lastClicked: null,
            lastClickedB21: null,
            
            notes:{},
            noteInput:"",
        }
    },
    color: "white",
    type: "none",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    position: 9,
    layerShown() { return false },
    update(diff) {
        //剧情检索
        for(i in lores){
            if(player.i.lores.includes(i)) continue
            if(lores[i].unl()) player.i.lores.push(i)
        }

        //Qol:输入文字时强制触发“沙漏”.
        if(addNote) player.i.b2state = true

        gamespeed = getGameSpeed()
        diff *= gamespeed
        globalDiff = diff

        player.i.a1 = player.i.a1.sub(diff*2).max(0)
        if(hasUpgrade('i',12)) player.i.b1 = player.i.b1.sub(diff).max(0)
        
        if(player.i.b1.lte(0)){
            player.i.b1 = n(Math.random()*3+1).floor()
            if(tmp.i.clickables[player.i.lastClickedB21].canClick) layers.i.clickables[player.i.lastClickedB21].onClick()
        }
        
        if(player.i.b2state || addNote) player.i.b2 = player.i.b2.sub(diff*(player.i.b2state === "hyper"?2:5)).max(0)
        else if(hasUpgrade("i",13)) player.i.b2 = player.i.b2.add(diff).min(10)
        if(player.i.b2.lte(0)) player.i.b2state = false

        player.i.b3 = player.i.b3.sub(diff/5).max(0)
    },
    clickables:{
        note:{
            display(){return addNote?(addNote!==true?`正在添加...`:`请选择需添加笔记的物品!`):`添加笔记`},
            style(){return {
                "background-color":addNote?(addNote!==true?`lime`:"pink"):"lightblue",
                width:"150px",
            }},
            unlocked(){return hasUpgrade("i",13)},
            canClick:true,
            onClick(){
                if(textarea === null) textarea = document.getElementById("textarea")
                if(addNote !== true && addNote) textarea.style.display = "none"
                addNote = !addNote //是的这玩意的类型非常不严格()
            },
        },
        11:{
            //在计数器为0时点击+1点数，反之-1点数. +1点数后重置计数器至5. 计数器每秒-2.
            display(){return `白色按钮` + (hasUpgrade('i',11)?`<br><big>${quickColor(formatWhole(player.i.a1),'red')}</big>`:'')},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                if(player.i.a1.lte(0)){
                    givePoint(1)
                    player.i.a1 = n(5)
                }
                else givePoint(-1)
            },
            tooltip(){return player.i.notes[this.id]},
        },
        12:{
            //点击时重置点数并增加计数器计数. 计数器计数以 *(x/4+1) 的效率倍增点数.
            display(){return `绿色按钮<br><big>${quickColor(formatWhole(player.i.a2),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                player.i.a2 = player.i.points.pow(0.5).sub(1).mul(2).max(0).floor()
                player.i.points = n(0)
                if(hasUpgrade('i',12)) player.i.a3 = n(Math.random()*5).floor()
            },
            unlocked(){return hasUpgrade('i',11)},
            tooltip(){return player.i.notes[this.id]},
        },
        13:{
            //每次重置/点击时随机计数器(0~4). 如果计数器大于2, 给予点数倍率; 如果计数器小于2, 给予点数惩罚. 在计数器为4的时候点击可以进行一次更好的随机(3~6)
            display(){return `骰子<br><big>${quickColor(formatWhole(player.i.a3),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                //givePoint(player.i.a3.sub(3))
                if(player.i.a3.eq(4)){
                    //givePoint(5) 降低复杂程度故删去
                    player.i.a3 = n(Math.random()*4+3).floor()
                }else player.i.a3 = n(Math.random()*5).floor()
                player.i.a2 = player.i.a2.mul(0.95).floor()
            },
            unlocked(){return hasUpgrade('i',12)},
            tooltip(){return player.i.notes[this.id]},
        },
        14:{
            //每次点击时,计数器-2. 长按时每秒计数器+4. 松开长按时,如果计数器在13~15之间,给予5点数. 超过15的话扣除8点数. 松开长按会清空计数器. 计数器会增加时间流速(*x/25+1),在40时封顶.
            display(){return `沙塔<br><big>${quickColor(formatWhole(player.i.a4),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                player.i.a4 = player.i.a4.sub(2).max(0)
            },
            onHold(){
                holdCheck(this.id)
                if(addNote) return
                player.i.a4 = player.i.a4.add(globalDiff*4)
            },
            onHoldStop(){
                if(player.i.a4.gte(13)) givePoint(5)
                if(player.i.a4.gte(15)) givePoint(-13)
                player.i.a4 = n(0)
            },
            unlocked(){return hasUpgrade('i',14)},
            tooltip(){return player.i.notes[this.id]},
        },
        21:{
            //计数器随时间降低. 在计数器为0时,点击上一个你点击过的物品(该物品除外),并且重设计时器(1~4). 点击*任何物品*可以使计数器微量上升,点击该物品可以使计数器较多地上升,但是超过9会对9取余.
            checkID(){return alphabetList[this.id[0]]+this.id[1]},
            display(){return `指针<br><big>${quickColor(formatWhole(player.i.b1),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                player.i.b1 = n(player.i.b1.add(1.5).toNumber()%9)
            },
            unlocked(){return hasUpgrade('i',12)},
            tooltip(){return player.i.notes[this.id]},
        },
        22:{
            //计数器随时间增加. 有三种模式: 1.关闭状态. 2.开启状态:计数器随时间降低,时间速率/3. 3.超频状态(长按1s,不受自己影响): 计数器随时间降低,时间速率*3
            checkID(){return alphabetList[this.id[0]]+this.id[1]},
            display(){return `沙漏<br><big>${quickColor(formatWhole(player.i.b2),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
                player.i.b2state = !player.i.b2state
                if(player.i.b2.lte(0)) player.i.b2state = false
            },
            onHold(){
                holdCheck(this.id)
                if(addNote) return
                player.i.b2holdTimer = player.i.b2holdTimer.add(0.05 * (player.i.b2state?3:1))
                if(player.i.b2holdTimer.gte(1)) player.i.b2state = "hyper"
                if(player.i.b2.lte(0)){
                    player.i.b2state = false
                    player.i.b2holdTimer = n(-1000)//嗯,暴力解决
                }
            },
            onHoldStop(){
                if(player.i.b2state === "hyper") player.i.b2state = false
                player.i.b2holdTimer = n(0)
            },
            unlocked(){return hasUpgrade('i',13)},
            tooltip(){return player.i.notes[this.id]},
        },
        23:{
            //连续点击同一个东西时,计数器上升(上限12). 计数器到达10后,每次点击点数-1. 每5秒计数器-1;点击不同东西时计数器-1; 计数器小于等于7时点数*2. 点击该物品实际上是没有用的（诶嘿）
            checkID(){return alphabetList[this.id[0]]+this.id[1]},
            display(){return `厌倦<br><big>${quickColor(formatWhole(player.i.b3),'red')}</big>`},
            canClick(){return typeof addNote === "boolean"},
            style(){if(addNote === this.id) return {
                "background-color":`lime`,
            }},
            onClick(){
                clickCheck(this.id)
                if(addNote) return
            },
            unlocked(){return hasUpgrade('i',14)},
            tooltip(){return player.i.notes[this.id]},
        },
    },
    
    upgrades:{
        11:{
            description(){return `给物品添加“计数器”.`},
            unlocked(){return player.i.points.gte(5) || hasUpgrade('i',11)},
            cost:n(10),
        },
        12:{
            description(){return `太没挑战了?再来点.`},
            unlocked(){return hasUpgrade('i',11)},
            cost:n(50),
        },
        13:{
            description(){return `学会写笔记!`},
            unlocked(){return hasUpgrade('i',12)},
            cost:n(250),
        },
        14:{
            description(){return `再来点?`},
            unlocked(){return hasUpgrade('i',13)},
            cost:n(1250),
        },
        15:{
            description(){return `呜呜来不及做了`},
            unlocked(){return hasUpgrade('i',14)},
            cost:n(6250),
        },
    },
    tabFormat: {
        "观测": {
            content:[
                ["clickable","note"],
                ["raw-html","<textarea id='textarea' rows='1' cols='20' oninput='updateNote()' style='display:none'></textarea>"],
                "blank",
                "clickables",
                'blank',
                'upgrades',
            ]
        },
    },
})