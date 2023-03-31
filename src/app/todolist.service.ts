import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { CompleteTodo } from './complete-todo';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  constructor() {
    let data = localStorage.getItem('todoItem');
    let datas = localStorage.getItem('completTodoItem');
    if (data != null) {
      this.todoItemsArray = JSON.parse(data);
    }
    if (datas != null) {
      this.completeTodos = JSON.parse(datas);
    }
  }

  private save() {
    localStorage.setItem('todoItem', JSON.stringify(this.todoItemsArray));
    localStorage.setItem('completTodoItem', JSON.stringify(this.completeTodos));
  }

  isEdit: boolean = false;
  selectedTodo: Todo = new Todo();

  todo: Todo = new Todo();
  todoItemsArray: Todo[] = [];
  completeTodo: CompleteTodo = new CompleteTodo();
  completeTodos: CompleteTodo[] = [];
  visible: boolean = false;
  messages: Message[] =[];

  visibleEdit(todo: Todo) {
    this.editItem(todo)
    this.showDialog()

  }
  showDialog() {
    this.visible = true;
  }
//alert
  message(){
    this.messages = [{ severity: 'error', summary: 'Error', detail: 'Kérem írjon be egy teendőt!' }];
  }
  addItem() {
    if (this.todo.title === '') {
      this.message()
      return;
    }
 
    // Adunk egy id-t az új elemnek
    this.todo.id = Date.now().toString();
    this.todoItemsArray.push(this.todo);
    this.todo = new Todo();
    this.save();
    console.log(this.todoItemsArray);
  }

  deleteItem(item: Todo) {
    const index = this.todoItemsArray.indexOf(item);
    if (index > -1) {
      this.todoItemsArray.splice(index, 1);
      this.save();
    }
  }

  editItem(todo: Todo) {
    this.isEdit = true;
    this.selectedTodo = { ...todo };
  }

  cancelEdit() {
    this.selectedTodo = { ...this.todo };
    this.isEdit = false;
  }

  saveEdit() {
    if (this.selectedTodo.title === '') {
      alert('A todo elem nem lehet üres!');
      return;
    }

    // Megkeressük a todoItemsArray tömbben azt az elemet,
    // amelyiknek az azonosítója megegyezik a selectedTodo objektum azonosítójával
    const index = this.todoItemsArray.findIndex(item => item.id === this.selectedTodo.id);

    // Ha találunk ilyen elemet, akkor módosítjuk a title és az id értékét 
    //a selectedTodo objektum title és id értékével
    if (index > -1) {
      this.todoItemsArray[index].title = this.selectedTodo.title;
      this.todoItemsArray[index].id = this.selectedTodo.id;
      this.save();
      console.log(this.todoItemsArray)
    }

    this.isEdit = false;
  }

  complete(todo: Todo) {
    const index = this.todoItemsArray.findIndex(item => item.id === todo.id);
    if (index > -1) {
      this.completeTodo = { ...todo };
      this.completeTodos.push(this.completeTodo);
      this.todoItemsArray.splice(index, 1);
      this.save();
      console.log(this.completeTodos)
    }
  }

  completDelete(item: Todo) {
    const index = this.completeTodos.indexOf(item);
    if (index > -1) {
      this.completeTodos.splice(index, 1);
      this.save();
    }
  }
}
