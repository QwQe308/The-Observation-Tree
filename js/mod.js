let modInfo = {
	name: "观测树",
	id: "The-Observation-Tree",
	author: "QwQe308<br>别的重要作者(感谢!)：<br>神秘(Shinwmyste)：制作TMTable模板 (!!!超强)",
	pointsName: "点数",
	modFiles: ["layers/mainDisplay.js","layers/insight.js","layers/lores.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (5), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}


// Set your version in num and name
let VERSION = {
	num: "beta-0.1",
	name: "",
}

let VERSIONS = [
    "beta-0.1"
]

function checkPrevVersion(oldVersion,targetVersion){
    return VERSIONS.indexOf(targetVersion)<VERSIONS.indexOf(oldVersion)
}

let changelog = `<h1>更新日志:</h1><br><br>
	<h3>beta-0.1</h3><br>
		- 感谢神秘制作的TMTable模板.
    `

let winText = `恭喜！你 >暂时< 通关了！`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["buyMax","onHoldStop"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = n(0)
    return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(60) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}