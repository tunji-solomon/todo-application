const todoList = JSON.parse(localStorage.getItem('my_todo_list')) || [];

renderTodoList();


// function to render the list to html
function renderTodoList(){
  let todoHtml = '';
  for(let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    const name = todoObject.name;
    const date = todoObject.date;
    const html = `
    <tr>
    <td class='first-column'>
      ${name}
    </td>
    <td class='table-middle-data'>
      ${date}
    </td>
    <td>
    <button class='todo-delete-btn table-data' onclick='
    todoList.splice(${i}, 1);
    renderTodoList();
    '>Delete</button>
    </td>
    </tr> 
    `;
    todoHtml += html;
    document.querySelector('.table-body').innerHTML = todoHtml;
  };


}
// function to add todo to list
function addTodo () {
  const todoInputElement = document.querySelector('.js-todo-name-input');
  const todoName = todoInputElement.value;
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
localStorage.setItem('my_todo_list', JSON.stringify(todoList))




