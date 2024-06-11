function getUpperInfo() {
    if (typeof options === "undefined") return `Loading...`
    if (typeof player === "undefined") return `Loading...`
    return `<div style = "overflow:hidden">
            <br><big><b><b>你拥有 ${format(player.i.points)} 点数</b></b></big>${quickColor(`(+ ${format(getPointGen())} /s)`, "#aaa")}<br><br>
            ${player.i.lores[player.i.lores.length-1]? (lores[player.i.lores[player.i.lores.length-1]].text()+'<br>') : ""}
            ${quickColor(player.i.lores[player.i.lores.length-2]? (lores[player.i.lores[player.i.lores.length-2]].text()+'<br>') : "",'#888')}
            <hr color="white" width="3000%" style="transform:translateX(-20%)"><br>
            </div>
    `
}


addNode("Ins small", {
    row: 1,
    position: 0,
    symbol: "<span class='leftArrow'>↓</span> 研究中心 <span class='rightArrow'>↓</span>",
    onClick() { resize("Ins") },
    layerShown() { return true },
    canClick: true
})

addNode("Ins 观测", {
    row: 1,
    color: "green",
    position: 1,
    symbol: "观测",
    layerShown() { return true },
    onClick() { if (this.canClick()) switchTab("i", "观测") },
    canClick() { return true },
})