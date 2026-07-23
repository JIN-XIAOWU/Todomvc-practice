(function () {
    "use strict";

    // 1. 找到需要操作的 HTML 元素
    var newTodoInput = document.querySelector(".new-todo");
    var todoList = document.querySelector(".todo-list");
    var todoCount = document.querySelector(".todo-count");
    var toggleAllCheckbox = document.querySelector(".toggle-all");

    // 2. 使用数组保存所有 Todo 数据
    var todos = [];

    // 3. 添加一条 Todo
    function addTodo(title) {
        var todo = {
            title: title,
            completed: false
        };

        todos.push(todo);
        render();
    }

    // 4. 根据 todos 数组重新显示页面
    function render() {
        todoList.innerHTML = "";

        for (var i = 0; i < todos.length; i++) {
            var listItem = document.createElement("li");
            var checkbox = document.createElement("input");
            var label = document.createElement("label");
            var deleteButton = document.createElement("button");

            checkbox.className = "toggle";
            checkbox.type = "checkbox";
            checkbox.checked = todos[i].completed;
            checkbox.setAttribute("data-index", i);

            deleteButton.className = "destroy";
            deleteButton.setAttribute("data-index", i);

            checkbox.addEventListener("change", function (event) {
                var index = Number(
                    event.target.getAttribute("data-index")
                );

                todos[index].completed = event.target.checked;
                render();
            });

            deleteButton.addEventListener("click", function (event) {
                var index = Number(
                    event.target.getAttribute("data-index")
                );

                todos.splice(index, 1);
                render();
            });
        

            label.textContent = todos[i].title;

            if (todos[i].completed === true) {
                listItem.className = "completed";
            }

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);
        }

        updateCount();
        updataToggleAll();
    }

    // 5. 更新未完成任务数量
    function updateCount() {
        var activeCount = 0;

        for (var i = 0; i < todos.length; i++) {
            if (todos[i].completed === false) {
                activeCount++;
            }
        }

        if (activeCount === 1) {
            todoCount.textContent = "1 item left";
        } else {
            todoCount.textContent = activeCount + " items left";
        }
    }

    // 6. 监听输入框的键盘事件
    newTodoInput.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") {
            return;
        }

        var title = newTodoInput.value.trim();

        if (title === "") {
            return;
        }

        addTodo(title);
        newTodoInput.value = "";
    });

    // 7.顶部复选框
    function updataToggleAll(){
        if(todos.length === 0){
            toggleAllCheckbox.checked = false;
            return;
        }

        for (var i = 0; todos.length; i++){
            if (todos[i].completed === false){
                toggleAllCheckbox.checked = false;
                return;
            }
        }

        toggleAllCheckbox.checked = true;


    }

    render();
})();