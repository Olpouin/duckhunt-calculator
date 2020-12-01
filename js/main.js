var header = new XMLHttpRequest();
header.open('GET', `content/header.html`, true);
header.onreadystatechange= function() {
	if (this.readyState!==4) return;
	if (this.status!==200) return;
	document.getElementsByTagName('body')[0].insertAdjacentHTML("afterbegin",this.responseText); //Adding the header
};
header.send();

var head = new XMLHttpRequest();
head.open('GET', `content/head.html`, true);
head.onreadystatechange= function() {
	if (this.readyState!==4) return;
	if (this.status!==200) return;
	document.getElementsByTagName('head')[0].insertAdjacentHTML("beforeend",this.responseText); //Ading the general head elements
};
head.send();