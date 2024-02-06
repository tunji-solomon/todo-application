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
    <div class='todo-row ${name + i}'>
    <div class='todo-name'>
      ${name}
    </div>
    <div>
      ${date}
    </div>
    <button class='todo-check-btn ${name + i} ${i}'  onclick='
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
        if(element.classList.contains((todoList[i].name + i))){
          let myElem = element;
          if(myElem.classList.contains(backColor)){
            myElem.classList.remove(backColor)
          }else{
            myElem.classList.add(backColor);
          };
        };})

        document.querySelectorAll(`.todo-check-btn`).forEach((element) => {
          if(element.classList.contains((todoList[i].name + i))){
            let myElem = element;
            if(myElem.classList.contains(btnElement)){
              myElem.classList.remove(btnElement);
              myElem.innerHTML = 'Check'
            }else{
              myElem.classList.add(btnElement);
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
      const popUpVisible = 'pop-up-container-visible';
      const popUpMessage = document.querySelector('.pop-up-message');
      const popUp = document.querySelector('.pop-up-container-hidden');
      const popUpButtonYes = document.querySelector('.pop-up-button');
      const popUpButtonNo = document.querySelector('.pop-up-button-no');
      if(popUp.classList.contains(popUpVisible)){
        false;
      }else{
        popUp.classList.add('pop-up-container-visible');
        popUpMessage.innerHTML = `Do you want to delete ${todoList[i].name} from todo list`;
        popUpButtonYes.onclick = () =>{
          todoList.splice(i,1);
          popUp.classList.remove(popUpVisible)
          renderTodoList();
        };
        popUpButtonNo.onclick = () => {
          popUp.classList.remove(popUpVisible);
        };
      
        renderTodoList();
      }

      };
    };
  }










