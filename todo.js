const todoList = JSON.parse(localStorage.getItem('my_todo_list')) || [];

renderTodoList();


// function to render the list to html
function renderTodoList(){
  let todoHtml = '';
  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const name =todoObject.name;
    const date = todoObject.date;
    const html = `
    <div class='todo-name'>
      ${name}
    </div>
    <div>
      ${date}
    </div>
    <button class='todo-delete-btn' onclick='
    todoList.splice(${i}, Number(1));
    renderTodoList();
    '>Delete</button>
    `;
    todoHtml += html;
  };
  if (todoList.length > 0){
    document.querySelector('.todo-list-container').innerHTML = todoHtml;
  }else if (todoList.length ===0){
    document.querySelector('.todo-list-container').innerHTML = `<p class = 'todo-empty-message'> No todo yet... </p>`;

  }
  localStorage.setItem('my_todo_list', JSON.stringify(todoList))


}
// function to add todo to list
function addTodo () {

  const todoInputElement = document.querySelector('.js-todo-name-input');
  const todoName = todoInputElement.value[0].toUpperCase() + todoInputElement.value.substr(1);
  const todoDateElement = document.querySelector('.js-todo-date-input');
  const todoDate = todoDateElement.value;
  if(todoInputElement.value && todoDateElement.value !== '' ){
    todoList.push({
      name : todoName,
      date : todoDate
    });
  }else{
    alert('both field required')

  }
  todoInputElement.value = '';
  todoDateElement.value = '';
  renderTodoList();



}





