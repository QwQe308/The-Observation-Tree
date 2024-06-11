addLayer("tree-tab", {
    tabFormat: [["tree", function () { return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS) }]],
    previousTab: "",
    leftTab: true,
})

addNode("others small", {
    row: 99,
    position: 0,
    symbol: "<span class='leftArrow'>↓</span> 其他 <span class='rightArrow'>↓</span>",
    onClick() { resize("others") },
    layerShown: true,
    canClick: true
})

addNode("others setting", {
    row: 99,
    position: 1,
    symbol: "设置",
    layerShown: true,
    canClick: true,
    onClick() { player.tab = "options-tab"; updateTabFormats(); needCanvasUpdate = true },
})

addNode("others info", {
    row: 99,
    position: 1,
    symbol: "游戏信息",
    layerShown: true,
    canClick: true,
    onClick() { player.tab = "info-tab"; updateTabFormats(); needCanvasUpdate = true },
})


var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
    showTree: true,

    treeLayout: ""


}

// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
},
)

function switchTab(layer, tab) {
    player.subtabs[layer].mainTabs = tab; player.tab = layer; updateTabFormats(); needCanvasUpdate = true
}

function resize(layer) {
    let layers = document.getElementsByClassName(layer)
    let container = layers[0].parentElement.parentElement.parentElement


    if (!container.className.includes("shrink")) {
        container.classList.replace('extend', 'shrink')
        container.style.maxHeight = "34px"
    }
    else {
        container.classList.replace('shrink', 'extend')
        needCanvasUpdate = true
         //container.style.maxHeight = layers.length * 50 - 16 + "px"//2a+b=134 a+b=84 a=50 b=34
    }
}

function fullResize(layer) {
    resize(layer)
    let layers = document.getElementsByClassName(layer)
    for (i in layers) {
        if (!layers[i].className) continue
        if (layers[i].className.includes("meta")) continue
        if (!layers[i].className.includes("small")) continue
        let container = layers[i].parentElement.parentElement.parentElement
        if (container.className.includes("shown")) {
            container.classList.replace('shown', 'hidden')
            container.style.maxHeight = "4px"
            needCanvasUpdate = true
        }
        else {
            container.classList.replace('hidden', 'shown')
            needCanvasUpdate = true
        }
    }
    for (i in smallLayersDOM) {
        let container = smallLayersContainerDOM[i]
        if(container.className.indexOf("shrink")+1 && container.className.indexOf("shown")+1){
            container.style.maxHeight = "34px"
        }
    }
}