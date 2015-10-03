/*
	Author: Praphul Sinha
	Description: 	This class represents a todoList. 
*/

function TodoList(dom, todoItem){
	this.dom = dom;
	this.todoItem = todoItem;
	this.todoListCreated = false;
}

TodoList.prototype.init = function() {
	//create ul
	this.dom.append(this.dom.create("ul"), this.dom.get("#todoapp"));
	this.todoListCreated = true;
};

TodoList.prototype.createItem = function(item) {
	this.dom.append(this.todoItem.createItem(item), this.dom.get("ul"));
};

TodoList.prototype.destroy = function() {
	this.dom.get("ul").innerHTML = "";
};