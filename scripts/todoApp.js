/*
	Author: Praphul Sinha
	Description: 	This class is the main application controller. 
					This class is responsibe for initializing todoItems class and
					and adding that object to todoList. It also handles sorting by date. 

*/

function TodoApp(todoList, dom){
	var self = this;
	self.todoList = todoList;
	self.dom = dom;
	self.todoModel = JSON.parse(window.localStorage.getItem('todoList')) || [];

	function init(){
		
		self.addList();
		for (var i = 0; i < self.todoModel.length; i++) {
			self.addListItem(self.todoModel[i]);
		};
	}
	if(!self.todoList.todoListCreated && self.todoModel.length){
		init();
	}
	
	function getMaxHash(){
		var max = 0;
		if(self.todoModel.length){
			max = self.todoModel[0].hash;

			self.todoModel.forEach(function(item, index){
				if(item.hash > max){
					max = item.hash;
				}
			});
		}
		

		return max;
	}	

	//attach an event on button
	self.dom.get(".add-item-btn").addEventListener("click", addItemCallback, false);
	self.dom.get("#todoapp").addEventListener("click", checkboxCallback, false);
	self.dom.get("#sort").addEventListener("click", sortCallback, false);

	function sortCallback(event){
		self.sort("dt");
		window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
		//window.location.href = window.location.href;
		self.todoList.destroy();
		init();
	}

	function addItemCallback(event){
		event.preventDefault();
		var inputText = self.dom.get("#new-todo");

		if(!self.todoList.todoListCreated){
			self.addList();
		}

		self.todoModel.push({
			dt: new Date(self.dom.get("#cal").value).getTime() ,
			txt: inputText.value, 
			completed: false, 
			priority: self.todoModel.length, 
			hash: getMaxHash() + 1});
		window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
		self.addListItem(self.todoModel[self.todoModel.length - 1]);

		inputText.value = "";
		var date = new Date();
		$("#cal").val(date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear());
	}

	function checkboxCallback(event){
		if(event.target.tagName.toLowerCase() == "input" && 
			event.target.getAttribute("type") == "checkbox"){
			self.todoModel.forEach(function(item, index){
				if(item.hash == Number(event.target.parentNode.getAttribute("data-hash"))){
					item.completed = event.target.checked;
				}
			});
			// self.todoModel[Number(event.target.parentNode.getAttribute("data-hash"))].completed = event.target.checked;
			event.target.parentNode.setAttribute("data-complete", event.target.checked);
			window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
		}

		if(event.target.tagName.toLowerCase() == "span" && event.target.className == "delete"){
			var itemToDel = event.target.parentNode.parentNode,
				spliceIndex;

			self.todoModel.forEach(function(item, index){
				if(item.hash == Number(itemToDel.getAttribute("data-hash"))){
					spliceIndex = index;
				}
			});

			self.todoModel.splice(spliceIndex, 1);
			window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));

			event.target.parentNode.parentNode.parentNode.removeChild(itemToDel);
		}

		if(event.target.tagName.toLowerCase() == "span" && event.target.className == "edit"){
			var targetEl = event.target.parentNode,
				labelEl, inputEl, updateBtnEl;
			for(var i = 0; i < event.target.parentNode.parentNode.childElementCount - 1; i++){
				try{
					if(targetEl.previousElementSibling.tagName.toLowerCase() == "label"){
						labelEl = targetEl.previousElementSibling;
					}else if(targetEl.previousElementSibling.tagName.toLowerCase() == "input" && 
						targetEl.previousElementSibling.getAttribute("type") == "text"){
						inputEl = targetEl.previousElementSibling;
					}else if(targetEl.previousElementSibling.tagName.toLowerCase() == "button" &&
						targetEl.previousElementSibling.className.split(" ")[1] == "update-btn"){
						updateBtnEl = targetEl.previousElementSibling;
					}

					targetEl = targetEl.previousElementSibling;
				}catch(e){

				}
			}

			labelEl.className = "hidden";
			inputEl.value = labelEl.innerText;
			inputEl.className = "show";
			var btnCls = updateBtnEl.className.split(" ");
			btnCls[0] = "show";
			updateBtnEl.className = btnCls.join(" ");
		}

		if(event.target.tagName.toLowerCase() == "button" &&
			event.target.className.split(" ")[1] == "update-btn"){
			var targetEl = event.target,
				labelEl, inputEl, updateBtnEl = event.target, liNode = event.target.parentNode;

			for(var i = 0; i < event.target.parentNode.childElementCount - 1; i++){
				try{
					if(targetEl.previousElementSibling.tagName.toLowerCase() == "label"){
						labelEl = targetEl.previousElementSibling;
					}else if(targetEl.previousElementSibling.tagName.toLowerCase() == "input" && 
						targetEl.previousElementSibling.getAttribute("type") == "text"){
						inputEl = targetEl.previousElementSibling;
					}

					targetEl = targetEl.previousElementSibling;
				}catch(e){

				}
					
			}

			labelEl.innerText = inputEl.value;
			labelEl.className = "show";
			inputEl.className = "hidden";
			updateBtnEl.className = "hidden update-btn";

			
			self.todoModel.forEach(function(item, index){
				if(item.hash == Number(liNode.getAttribute("data-hash"))){
					item.txt = labelEl.innerText;
					window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
				}
			});
		}

		//up  priority
		if(event.target.parentElement.tagName.toLowerCase() == "button" &&  event.target.parentElement.className == "up"){
			try{
				var tempModel, tempPriority;

				//get target element hash and priority
				var targetItem = event.target.parentNode.parentNode;
				var targetHash = Number(targetItem.getAttribute("data-hash"));
				var targetModelIndex;

				//get previous element hash and priority
				var previousItem = targetItem.previousElementSibling;
				var previousHash = Number(previousItem.getAttribute("data-hash"));
				var previousModelIndex;

				//extract the data from the model and exchange the data
				self.todoModel.forEach(function(item, index){
					if(item.hash == targetHash){
						targetModelIndex = index;
					}else if(item.hash == previousHash){
						previousModelIndex = index;
					}
				});

				tempModel = self.todoModel[targetModelIndex];
				self.todoModel[targetModelIndex] = self.todoModel[previousModelIndex]
				self.todoModel[previousModelIndex] = tempModel;
				//save it
				window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
				//update the UI
				self.todoList.destroy();
				init();
			}catch(e){

			}
				
		}

		//down  priority
		if(event.target.parentElement.tagName.toLowerCase() == "button" &&  event.target.parentElement.className == "down"){
			try{
				var tempModel, tempPriority;

				//get target element hash and priority
				var targetItem = event.target.parentNode.parentNode;
				var targetHash = Number(targetItem.getAttribute("data-hash"));
				var targetModelIndex;

				//get previous element hash and priority
				var nextItem = targetItem.nextElementSibling;
				var nextHash = Number(nextItem.getAttribute("data-hash"));
				var nextModelIndex;

				//extract the data from the model and exchange the data
				self.todoModel.forEach(function(item, index){
					if(item.hash == targetHash){
						targetModelIndex = index;
					}else if(item.hash == nextHash){
						nextModelIndex = index;
					}
				});

				tempModel = self.todoModel[targetModelIndex];
				self.todoModel[targetModelIndex] = self.todoModel[nextModelIndex]
				self.todoModel[nextModelIndex] = tempModel;
				//save it
				window.localStorage.setItem("todoList", JSON.stringify(self.todoModel));
				//update the UI
				self.todoList.destroy();
				init();
			}catch(e){

			}
				
		}
	}
}

TodoApp.prototype.addList = function() {
	this.todoList.init();
};

TodoApp.prototype.addListItem = function(item) {
	this.todoList.createItem(item);
};

TodoApp.prototype.sort = function(key) {
	this.todoModel.sort(function(a, b){
		return a[key] - b[key];
	});
};

//initialize calandar
$("#cal").datepicker();

var date = new Date();
$("#cal").val(date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear());
new TodoApp(new TodoList(new Dom, new TodoItem(new Dom)), new Dom);