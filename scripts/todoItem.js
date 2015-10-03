/*
	Author: Praphul Sinha
	Description: 	This class represents a todoItem in the list. 
					Its responsibe for creating todoItems and
					and handling their priorities. 

*/

function TodoItem(dom){
	this.dom = dom;
}

TodoItem.prototype.createItem = function(item) {
	var li = this.dom.create("li");
	li.setAttribute("data-complete", item.completed);
	li.setAttribute("data-hash", item.hash)
	//li.innerText = itemText;

	var checkbox = this.dom.create("input");
	checkbox.setAttribute("type", "checkbox");
	if(item.completed){
		checkbox.checked = true;
		//li.setAttribute("data-complete", false);
	}

	var label = this.dom.create("label");
	label.innerText = item.txt;

	var editText = this.dom.create("input");
	editText.setAttribute("type", "text");
	editText.className = "hidden";
	var editButton = this.dom.create("button");
	editButton.className = "";
	editButton.className = "hidden update-btn";
	editButton.innerText = "Update";

	var deleteList = this.dom.create("button");
	var deleteIcon = this.dom.create("span");
	deleteIcon.className = "delete";
	deleteList.className = "btn-1"
	this.dom.append(deleteIcon, deleteList);

	var edit = this.dom.create("button");
	var editIcon = this.dom.create("span");
	editIcon.className = "edit";
	this.dom.append(editIcon, edit);

	var increasePriority = this.dom.create("button");
	increasePriority.className = "up";
	var increasePriorityIcon = this.dom.create("span");
	increasePriorityIcon.innerText = "up";
	this.dom.append(increasePriorityIcon, increasePriority);

	var decreasePriority = this.dom.create("button");
	decreasePriority.className = "down";
	var decreasePriorityIcon = this.dom.create("span");
	decreasePriorityIcon.innerText = "down";
	this.dom.append(decreasePriorityIcon, decreasePriority);

	var spanDt = this.dom.create("span");
	spanDt.className = "display-dt";
	var date = new Date(item.dt);
	spanDt.innerText = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear();

	this.dom.append(checkbox, li);
	this.dom.append(label, li);
	this.dom.append(editText, li);
	this.dom.append(editButton, li);
	this.dom.append(deleteList, li);
	this.dom.append(edit, li);
	this.dom.append(increasePriority, li);
	this.dom.append(decreasePriority, li);
	this.dom.append(spanDt, li);

	return li;
};