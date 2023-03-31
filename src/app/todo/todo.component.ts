import { Component, OnInit } from '@angular/core';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  constructor (public service: TodolistService ){
    
  }

  ngOnInit() {
    this.focus();
  }

  focus(){
    let todoInput = document.getElementById('todoInput');
  
    todoInput?.focus();
  }
}
