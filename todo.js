const todoList = JSON.parse(localStorage.getItem('my_todo_list')) || [];

renderTodoList();


// function to render the list to html
function renderTodoList(){
  let todoHtml = '';
  for(let i = 0;i < todoList.length; i++){
    const todoObject = todoList[i];
    const name =todoObject.name;
    const date = todoObject.date;
    const html = `
    <div class='todo-row ${name}'>
    <div class='todo-name'>
      ${name}
    </div>
    <div>
      ${date}
    </div>
    <button class='todo-delete-btn' onclick='
    todoList.splice(${i}, 1);
    renderTodoList();
    '>Delete</button>
    </div>
    `;

    todoHtml += html;
  };
  if (todoList.length > 0){
    document.querySelector('.todo-list-container').innerHTML = todoHtml;
  }else if (todoList.length ===0){
    document.querySelector('.todo-list-container').innerHTML = `<p class = 'todo-empty-message'> No todo yet... </p>`;

  }
  backgroundColor();
  buttonColor();
  localStorage.setItem('my_todo_list', JSON.stringify(todoList));


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

document.body.addEventListener('load', () => {
  renderTodoList();
})

document.querySelector('.js-todo-add-btn')
.addEventListener('click', () => {
  addTodo();
})

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    addTodo();
  }
})

function todoChecked(name){
  document.querySelectorAll(`.todo-row`).forEach((element) => {
    if(element.classList.contains(String(name))){
      element.classList.add('todo-row-checked')
    }
})}


function backgroundColor(){
    let i = 0;
    while (i < todoList.length){
      document.querySelectorAll('.todo-row').forEach(element => {
      if(i % 2 === 0){
        element.classList.add('todo-row-even');
        i++;
      }else{
        element.classList.add('todo-row-odd');
        i++;
      }
    }
  )}

}

function buttonColor(){
  let i = 0;
  while (i < todoList.length){
    document.querySelectorAll('.todo-delete-btn').forEach(element => {
    if(i % 2 === 0){
      element.classList.add('todo-delete-btn-even');
      i++;
    }else{
      element.classList.add('todo-delete-btn-odd');
      i++;
    }
  }
)}
}









