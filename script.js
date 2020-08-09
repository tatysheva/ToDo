let addBtn = document.querySelector('.add-button'),
    addMessage = document.querySelector('.message'),
    todo = document.querySelector('.todo-ul'),
    checkBox = document.querySelectorAll("input[type=checkbox]");



let todoList = [];



function render(todoList) {
    return todoList.map((item, i) => {
        return ` 
        <li>
          <input type='checkbox' class="item-checkbox" data-index="${i}">
          <label><input class="item-input" value="${item.todo}" data-index="${i}"></label>
          <button class="remove-btn" data-index="${i}">
          <span><i class="fas fa-times"></i></span>
          </button>
        </li>`
    })
}

function save(todoList) {
    localStorage.setItem('todo', JSON.stringify(todoList))
    localStorage.setItem('checkBox', 'true')
}

function read() {
    todoList = JSON.parse(localStorage.getItem("todo"));
    todo.innerHTML = render(todoList);
}

if (localStorage.getItem("todo")) {
    read();
}
addBtn.addEventListener('click', function () {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false
    };

    todoList.push(newTodo);
    todo.innerHTML = render(todoList);
    save(todoList);
    addMessage.value = "";
});

todo.addEventListener('click', (event) => {
    let removeBtn = event.target.closest(".remove-btn");
    if (!removeBtn) {
        return
    }
    let index = Number(removeBtn.getAttribute('data-index'));
    todoList.splice(index, 1)
    todo.innerHTML = render(todoList);
    save(todoList);
})

todo.addEventListener('keyup', (event) => {
    let changeInput = event.target.closest(".item-input");

    if (!changeInput) {
        return
    }
    let index = Number(changeInput.getAttribute('data-index'));
    todoList[index].todo = changeInput.value;
    save(todoList);
})

todo.addEventListener('change', (event) => {
    let changeInput = event.target.closest(".item-input");

    if (changeInput) {
        let index = Number(changeInput.getAttribute('data-index'));
        todoList[index].todo = changeInput.value;
        save(todoList);
        return;     
    }
    let changeCheckboxInput = event.target.closest(".item-checkbox");
    if(changeCheckboxInput) {
        let index = Number(changeCheckboxInput.getAttribute('data-index'));
        todoList[index].checked = changeCheckboxInput.value;
        save(todoList);
        return; 
    }
})
