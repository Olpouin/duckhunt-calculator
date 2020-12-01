function duckToColor(duck) {
	duck = duck.toLowerCase();
	let duckToColorArray = {
		"golden": "#ffd700",
		"moad": "#ff1493",
		"mechanical": "#708090",
		"ghost": "#FFFFFF"
	}
	return (duckToColorArray[duck] === undefined) ? "#"+intToRGB(hashCode(key)) : duckToColorArray[duck];
}

let chartAccuracyData = [];
let chartReliabilityData = [];
let chartBulletsData = [];
let chartMagazinesData = [];
let chartTotalAmmoData = [];
let chartLevelLabels = [];
levels.forEach(e => {
	chartAccuracyData.push({x:e.level,y:e.accuracy});
	chartReliabilityData.push({x:e.level,y:e.reliability});
	chartBulletsData.push({x:e.level,y:e.bullets});
	chartMagazinesData.push({x:e.level,y:e.magazines});
	chartTotalAmmoData.push({x:e.level,y:e.bullets*e.magazines});
	chartLevelLabels.push(e.level);
});
var chart = new Chart(document.getElementById('chart-accuracy').getContext('2d'), {
	type: 'line',
	data: {
		labels: chartLevelLabels,
		datasets: [{
			label: 'Accuracy',
			borderColor: '#1E448A',
			data: chartAccuracyData
		},
		{
			label: 'Reliability',
			borderColor: '#FFCC00',
			data: chartReliabilityData
		}]
	},
	options: {
		title:{display:true,text:"Accuracy and reliability based on levels"},
		scales:{
			xAxes:[{display:true,scaleLabel:{display:true,labelString:"Level"}}],
			yAxes:[{display:true,scaleLabel:{display:true,labelString:"Accuracy & reliability (%)"},ticks:{suggestedMin:50,suggestedMax:100}}],
		}
	}
});
var chart = new Chart(document.getElementById('chart-ammo').getContext('2d'), {
	type: 'line',
	data: {
		labels: chartLevelLabels,
		datasets: [{
			label: 'Bullets per magazine',
			borderColor: '#AE1C28',
			data: chartBulletsData
		},
		{
			label: 'Magazines',
			borderColor: '#FFFFFF',
			data: chartMagazinesData
		},
		{
			label: 'Total bullets',
			borderColor: '#21468B',
			data: chartTotalAmmoData
		}]
	},
	options: {
		title:{display:true,text:"Accuracy and reliability based on levels"},
		scales:{
			xAxes:[{display:true,scaleLabel:{display:true,labelString:"Level"}}],
			yAxes:[{display:true,scaleLabel:{display:true,labelString:"Bullets & magazines"},ticks:{}}],
		}
	}
});

var set = new Settings();
let chartDucktypeData = [];
let chartDucktypeBackgroundcolor = [];
let chartDucktypeLabels = [];
for (var [key, value] of Object.entries(set.spawn_weight)) {
	chartDucktypeLabels.push(key);
	chartDucktypeBackgroundcolor.push(duckToColor(key));
	chartDucktypeData.push(value);
};

var myDoughnutChart = new Chart(document.getElementById('chart-ducktype').getContext('2d'), {
	type: 'pie',
	data: {
		labels: chartDucktypeLabels,
		datasets: [{data:chartDucktypeData,backgroundColor:chartDucktypeBackgroundcolor}]},
	options: {
		title:{display:true,text:"Probability of each type of duck spawning"},
	}
});