/*
	Author: Praphul Sinha
	Description: This class is used for creating dynamic DOM elements

*/

function Dom(){

}

Dom.prototype.create = function(tagName) {
	return document.createElement(tagName);
};

Dom.prototype.get = function(el) {
	var element;

	if(el.indexOf(".") == 0){
		//get element by class name
		element = document.getElementsByClassName(el.substr(1, el.length))[0];
	}else if(el.indexOf("#") == 0){
		//get element by id
		element = document.getElementById(el.substr(1, el.length));
	}else{
		element = document.getElementsByTagName(el)[0];
	}

	return element;
};

Dom.prototype.insert = function(elToAdd, position, refEl){

};

Dom.prototype.append = function(elToAdd, parentEl){
	parentEl.appendChild(elToAdd);
};