(function () {
    "use strict";

    // 1. 找到需要删选操作的HTML元素
    var newTodoInput = document.querySelector(".new-todo");
    var todoList = document.querySelector(".todo-list");
    var todoCount = document.querySelector(".todo-count");
    
    // 2.用数组保存所有Todo数据
    var todos = [];

    // 3.添加一条Todo
    function addTodo(title) {
        var todo = {
            title: title,
            completed: false
        };

        todos.push(todo);
        render();
    }

    // 4.根据Todos数组重新显示页面
    function render(){
        todoList.innerHTML = "";
        
        for(var i = 0; i < todos.length; i++){
            var listItem = document.createElement("li");
            var checkbox = document.createElement("input");
            var label = document.createElement("label");
            var deleteButton = document.createElement("button");
            checkbox.className = "toggle"
            checkbox.type = "checkbox"
            checkbox.checked = todo[i].completed;
            deleteButton.className = "destroy"
            

            label.textContent = todos[i].title

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);

        updateCount();
    }


    // 5.更新任务数量
    function updateCount(){
        if (todos.length === 1) {
            todoCount.textContent = "1 item left";
        }else{
            todoCount.textContent = todos.length + " items left";
        }
    }

    // 6.监听输入框的键盘事件
    newTodoInput.addEventListener("keydown",function(event){
        if (event.key !== "Enter"){
            return;
        }
        
        var title = newTodoInput.value.trim();

        if (title === ""){
            return;
        }

        addTodo(title);
        newTodoInput.value = "";
    });


    render();
})();