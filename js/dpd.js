class DucksPerDay {
	_users = 1; _ducks = 125; _input;
	set input(name) {this._input = name;}
	get input() {return this._input;}

	set users(x) {
		x = parseInt(x);
		this._users = x;
		this._ducks = 125 + (x / (5 + (x / 300)));
		this.update("ducks");
	}
	set ducks(x) {
		x = parseInt(x);
		this._users = - ((1500 * (x - 125)) / (x - 425));
		this._ducks = x;
		this.update("users");
	}
	get users() {
		if (this._users < 1) return 1;
		if (this._users > 500000) return 500000;
		return Math.round(this._users);
	}
	get ducks() {
		if (this._ducks == 69420) alert("heh");
		if (this._ducks < 125) return 125;
		if (this._ducks > 424) return 424;
		return Math.round(this._ducks);
	}

	update(type) {
		document.getElementById(`${type}-number`).value = this[type];
		document.getElementById(`${type}-range`).value = this[type];
		if(type=="ducks") document.getElementById(`users-${this.input}`).value = this.users;
		else document.getElementById(`ducks-${this.input}`).value = this.ducks;
	}
}
const dpd = new DucksPerDay();

let chartData = [];
let chartLabels = [];
for (let users = 0; users <= 15000; users += 300) {
	var ducks = Math.round(125+(users/(5+(users/300))));
	chartData.push({x:users,y:ducks});
	chartLabels.push(users);
}
var chart = new Chart(document.getElementById('chart').getContext('2d'), {
	type: 'line',
	data: {
		labels: chartLabels,
		datasets: [{
			label: 'Max ducks per day',
			borderColor: '#AE1C28 ',
			data: chartData
		}]
	},
	options: {
		legend:{display:false},
		title:{display:true,text:"Ducks per day allowed based on total members"},
		scales:{
			xAxes:[{display:true,scaleLabel:{display:true,labelString:"Total members"}}],
			yAxes:[{display:true,scaleLabel:{display:true,labelString:"Maximum ducks pe day"}}],
		}
	}
});