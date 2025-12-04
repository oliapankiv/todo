import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  private readonly todoService = inject(TodoService);

  public title = '';

  addTodo() {
    if (!this.title.trim().length) return;

    this.todoService.addItem(this.title);

    // reset title to clear input field
    this.title = '';
  }
}
