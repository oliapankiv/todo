import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { Todo } from '../../interfaces/todo.interface';


@Component({
  selector: 'todo-item',
  imports: [FormsModule, MatCheckboxModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  public readonly todo = input.required<Todo>();

  public readonly toggle = output();
  public readonly remove = output();

  public onToggleClick(): void {
    this.toggle.emit();
  }

  public onRemoveClick(): void {
    this.remove.emit();
  }
}
