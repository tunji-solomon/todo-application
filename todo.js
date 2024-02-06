const todoList = JSON.parse(localStorage.getItem('my_todo_list')) || [];

renderTodoList();


// function to render the list to html
function renderTodoList(){
  let todoHtml = '';
  let chck;
  for(let i = 0;i < todoList.length; i++){
    const todoObject = todoList[i];
    const name =todoObject.name;
    const date = todoObject.date;
    chck = i;
    const html = `
    <div class='todo-row ${name}'>
    <div class='todo-name'>
      ${name}
    </div>
    <div>
      ${date}
    </div>
    <button class='todo-check-btn ${name} ${i}'  onclick='
    renderTodoList();
    '>Check</button>
    <button class= 'todo-delete-btn ${name} ${i}' onclick='
    deleteTodo(${i});
    renderTodoList();
    '>
    Delete
    </button>

    </div>
    `;

    todoHtml += html;
  };
  if (todoList.length > 0){
    document.querySelector('.todo-list-container').innerHTML = todoHtml;
  }else if (todoList.length ===0){
    document.querySelector('.todo-list-container').innerHTML = `<p class = 'todo-empty-message'> No todo yet... </p>`;

  }

  document.querySelectorAll(`.todo-check-btn`).forEach((element) => {
    for(let i = 0; i < todoList.length; i ++){
      if(element.classList.contains((i))){
        let myElem = element;
        myElem.onclick = () => {
          todoChecked(i);

        }
      }
    }
;})


// document.querySelectorAll(`.todo-delete-btn`).forEach((element) => {
//   for(let i = 0; i < todoList.length; i ++){
//     if(element.classList.contains((i))){
//       let myElem = element;
//       myElem.onclick = () => {
//         deleteTodo(i);

//       }
//     }
//   }
// ;})


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

function todoChecked(value){
  let btnElement = 'todo-checked';
  let backColor = 'todo-row-clicked'
  for(let i = 0; i < todoList.length; i ++ ){
    if(value === i){
      document.querySelectorAll(`.todo-row`).forEach((element) => {
        if(element.classList.contains((todoList[i].name))){
          let myElem = element;
          if(myElem.classList.contains(backColor)){
            myElem.classList.remove(backColor)
          }else{
            myElem.classList.add(backColor);
            console.log('checked');
          };
        };})

        document.querySelectorAll(`.todo-check-btn`).forEach((element) => {
          if(element.classList.contains((todoList[i].name))){
            let myElem = element;
            if(myElem.classList.contains(btnElement)){
              myElem.classList.remove(btnElement);
              myElem.innerHTML = 'Check'
            }else{
              myElem.classList.add(btnElement);
              console.log(myElem);
              myElem.innerHTML = 'Checked';
            };
            }
          ;})
        
      
    }
  }};



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

function deleteTodo(id){
  for(let i = 0; i < todoList.length; i ++ ){
    if(id === i){
      let check = confirm(`Do you want to delete ${todoList[i].name} from todo list.` );
      if(check){
        todoList.splice(todoList[i], 1);
        renderTodoList()
        console.log('deleted');
        console.log(todoList);
      }
    }
  }
}

function showName(i){
  console.log(i);

}

function todoBtn(v){
  console.log(v);
  let i = 0;
  while(i < todoList.length){
    console.log('yes',i)
          i++;
        }  
}







