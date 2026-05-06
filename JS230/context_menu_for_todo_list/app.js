let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with John'},
];


/*
when user right click on a todo item, display a context menu
still need to work on hide event 
*/
class App {
  constructor(todos) {
    this.todos = todos;
    this.todosDiv = document.querySelector('.todos');
    this.confirmDiv = document.querySelector('.confirm_prompt');
    this.overlayDiv = document.querySelector('.overlay');
    this.contextMenuDiv = document.querySelector('.context_menu')
    this.selectedTodoId
    this.renderTodos();

    this.todosDiv.addEventListener('click', this.handleDeleteClick.bind(this));
    this.confirmDiv.addEventListener('click', this.handleConfirmClick.bind(this));
    this.overlayDiv.addEventListener('click', this.handleOverlayClick.bind(this));
    this.todosDiv.addEventListener('mousedown', this.handleRightClick.bind(this))
    this.contextMenuDiv.addEventListener('click', this.handleContextClicked.bind(this))

}

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.renderTodos();
  }

  todosTemplate() {
    return this.todos
      .map(todo => `<li data-id="${todo.id}">${todo.title} <span class="remove"></span></li>`)
      .join('');
  }

  confirmTemplate(todo) {
    return `
      <div class="confirm_wrapper" data-id="${todo.id}">
        <p>Are you sure you want to delete "${todo.title}"?</p>
        <div class="actions">
          <a href="#" class="confirm_yes">Yes</a>
          <a href="#" class="confirm_no">No</a>
        </div>
      </div>
    `;
  }

  handleDeleteClick(event) {
    if (!event.target.classList.contains('remove')) return;
    let todoId = Number(event.target.closest('li').dataset.id);
    let todo = this.todos.find(todo => todo.id === todoId);
    this.showPrompt(todo);
  }

  handleConfirmClick(event) {
    event.preventDefault();
    let button = event.target;
    if (!button.classList.contains('confirm_yes') && !button.classList.contains('confirm_no')) return;

    let todoId = Number(button.closest('.confirm_wrapper').dataset.id);
    if (button.classList.contains('confirm_yes')) {
      this.deleteTodo(todoId);
    }

    this.hidePrompt();
  }
  handleRightClick(event){
    event.preventDefault()
    
    if(event.button === 2){
        let rightClick = event.target.closest('li')
        let todoId = Number(rightClick.dataset.id)
        this.selectedTodoId = todoId
        this.contextMenuDiv.innerHTML = this.displayContextMenu(todoId)
        this.contextMenuDiv.style.top = `${event.clientY}` + 'px';
        this.contextMenuDiv.style.left = `${event.clientX}` + 'px';
        this.contextMenuDiv.classList.add('show')
    }
  }
  displayContextMenu(todo){
    return `<ul><a href="#" class="show_details">Show Detail</a>
                <a href="#" class="edit_todo">Edit Todo</a>
                <a href="#" class="delete_todo">Delete Todo</a>
            </ul>`
  }
  handleContextClicked(event){
     let todo
    if (event.target.classList.contains('delete_todo'))
    { todo = this.todos.find(todo => todo.id === this.selectedTodoId)
    this.showPrompt(todo)}
  }
  handleOverlayClick(event) {
    if (!event.target.classList.contains('overlay')) return;
    this.hidePrompt();
  }

  renderTodos() {
    this.todosDiv.innerHTML = this.todosTemplate();
  }

  showPrompt(todo) {
    this.confirmDiv.innerHTML = this.confirmTemplate(todo);
    this.confirmDiv.classList.add('show');
    this.overlayDiv.classList.add('show');
  }

  hidePrompt() {
    this.confirmDiv.innerHTML = '';
    this.confirmDiv.classList.remove('show');
    this.overlayDiv.classList.remove('show');
  }
}

new App(todoItems);