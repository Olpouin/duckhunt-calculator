var header = new XMLHttpRequest();
header.open('GET', `content/header.html`, true);
header.onreadystatechange= function() {
	if (this.readyState!==4) return;
	if (this.status!==200) return;
	document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin",this.responseText); //Adding the header
};
header.send();

class Settings {
	_spawn_weight = {
		Normal: 100,
		Super: 15,
		Baby: 7,
		Prof: 10,
		Ghost: 1,
		MOAD: 5,
		Mechanical: 1,
		Armored: 3,
		Golden: 1,
		Plastic: 6,
		Kamikaze: 6
	};
	constructor(data="{}") {
		let JSONdata = JSON.parse(data);
		this.spawn_weight_moad_ducks = JSONdata.spawn_weight_moad_ducks;
	}

	get spawn_weight() {
		return Object.fromEntries(Object.entries(this._spawn_weight).sort(([,a],[,b])=>b-a));
	}
}

function hashCode(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
} 
function intToRGB(i){
	var c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase();
	return "00000".substring(0, 6 - c.length) + c;
}

const levels = [
    {"level": 0,  "expMin": -999, "accuracy": 95, "reliability": 85, "bullets": 6, "magazines": 1},
    {"level": 1,  "expMin": -6,   "accuracy": 90, "reliability": 85, "bullets": 6, "magazines": 2},
    {"level": 2,  "expMin": 20,   "accuracy": 70, "reliability": 86, "bullets": 6, "magazines": 2},
    {"level": 3,  "expMin": 50,   "accuracy": 54, "reliability": 87, "bullets": 6, "magazines": 2},
    {"level": 4,  "expMin": 90,   "accuracy": 58, "reliability": 88, "bullets": 8, "magazines": 2},
    {"level": 5,  "expMin": 140,  "accuracy": 59, "reliability": 89, "bullets": 8, "magazines": 2},
    {"level": 6,  "expMin": 200,  "accuracy": 60, "reliability": 90, "bullets": 8, "magazines": 2},
    {"level": 7,  "expMin": 270,  "accuracy": 65, "reliability": 93, "bullets": 4, "magazines": 3},
    {"level": 8,  "expMin": 350,  "accuracy": 67, "reliability": 93, "bullets": 4, "magazines": 3},
    {"level": 9,  "expMin": 440,  "accuracy": 69, "reliability": 93, "bullets": 4, "magazines": 3},
    {"level": 10, "expMin": 540,  "accuracy": 71, "reliability": 94, "bullets": 4, "magazines": 3},
    {"level": 11, "expMin": 650,  "accuracy": 73, "reliability": 94, "bullets": 4, "magazines": 3},
    {"level": 12, "expMin": 770,  "accuracy": 73, "reliability": 94, "bullets": 4, "magazines": 3},
    {"level": 13, "expMin": 900,  "accuracy": 74, "reliability": 95, "bullets": 4, "magazines": 3},
    {"level": 14, "expMin": 1040, "accuracy": 74, "reliability": 95, "bullets": 4, "magazines": 3},
    {"level": 15, "expMin": 1190, "accuracy": 75, "reliability": 95, "bullets": 4, "magazines": 3},
    {"level": 16, "expMin": 1350, "accuracy": 80, "reliability": 97, "bullets": 2, "magazines": 4},
    {"level": 17, "expMin": 1520, "accuracy": 81, "reliability": 97, "bullets": 2, "magazines": 4},
    {"level": 18, "expMin": 1700, "accuracy": 81, "reliability": 97, "bullets": 2, "magazines": 4},
    {"level": 19, "expMin": 1890, "accuracy": 82, "reliability": 97, "bullets": 2, "magazines": 4},
    {"level": 20, "expMin": 2090, "accuracy": 82, "reliability": 97, "bullets": 2, "magazines": 4},
    {"level": 21, "expMin": 2300, "accuracy": 83, "reliability": 98, "bullets": 2, "magazines": 4},
    {"level": 22, "expMin": 2520, "accuracy": 83, "reliability": 98, "bullets": 2, "magazines": 4},
    {"level": 23, "expMin": 2750, "accuracy": 84, "reliability": 98, "bullets": 2, "magazines": 4},
    {"level": 24, "expMin": 2990, "accuracy": 84, "reliability": 98, "bullets": 2, "magazines": 4},
    {"level": 25, "expMin": 3240, "accuracy": 85, "reliability": 98, "bullets": 2, "magazines": 4},
    {"level": 26, "expMin": 3500, "accuracy": 90, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 27, "expMin": 3770, "accuracy": 91, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 28, "expMin": 4050, "accuracy": 91, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 29, "expMin": 4340, "accuracy": 92, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 30, "expMin": 4640, "accuracy": 92, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 31, "expMin": 4950, "accuracy": 93, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 32, "expMin": 5270, "accuracy": 93, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 33, "expMin": 5600, "accuracy": 94, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 34, "expMin": 5940, "accuracy": 94, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 35, "expMin": 6290, "accuracy": 95, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 36, "expMin": 6650, "accuracy": 95, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 37, "expMin": 7020, "accuracy": 96, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 38, "expMin": 7400, "accuracy": 96, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 39, "expMin": 7790, "accuracy": 97, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 40, "expMin": 8200, "accuracy": 97, "reliability": 99, "bullets": 1, "magazines": 5},
    {"level": 41, "expMin": 9999, "accuracy": 98, "reliability": 99, "bullets": 1, "magazines": 6},
    {"level": 42, "expMin": 11111,"accuracy": 99, "reliability": 99, "bullets": 1, "magazines": 7}
];