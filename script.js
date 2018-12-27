/* This todo app needs 5 things:
1. A place to store todos
2. A way to display todos
3. A way to add new todos
4. A way to change todos
5. A way to delete todos */

var todoList = {
    todos: [],

    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },  
    
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        this.todos.forEach(function(todo) {
            if(todo.completed === true) {
                completedTodos++;
            }
        });
        
        this.todos.forEach(function(todo) {
          if (completedTodos === totalTodos) {
              todo.completed = false;
          } else {
              todo.completed = true;
          }  
        });
    }
}
        
var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        views.displayTodos();
    },
    
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');    
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.value, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        views.displayTodos();
    },
    
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        views.displayTodos();
    },
    
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.value);
        toggleCompletedPositionInput.value = '';
        views.displayTodos();
    },
    
    toggleAll: function() {
        todoList.toggleAll();
        views.displayTodos();
    }
};

var views = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        
        todoList.todos.forEach(function(todo, position) {
            var todoLi = document.createElement('li');
            var todoTextWithCompletion = '';
            
            if (todo.completed === true) {
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText; 
            }
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
            
        }, this)
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        //deleteButton.onclick = 
        return deleteButton;
    },
    setUpEventListeners: function () {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            //get element that was clicked on
            var elementClicked = event.target;
    
            //check if element clicked was a delete button
            if (elementClicked.className === 'deleteButton') {
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            } 
        });
    }
}

var todosUl = document.querySelector('ul');
todosUl.addEventListener('click', function(event) {
   //get element that was clicked on
    var elementClicked = event.target;
    
    //check if element clicked was a delete button
    if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    } 
})













