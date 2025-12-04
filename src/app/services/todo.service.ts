import { Injectable, signal } from '@angular/core';

import { Todo } from '../interfaces/todo.interface';
import { TodoTab } from '../enums/todo-tab.enum';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly todos = signal<Todo[]>([]);

  public addItem(title: string): void {
    const item: Todo = { title, completed: false, id: Date.now() };

    this.todos.update(value => [...value, item]);
  }

  public removeItem(id: number): void {
    this.todos.update(value => value.filter(item => item.id !== id));
  }

  public removeCompleted(): void {
    this.todos.update(value => value.filter(item => !item.completed));
  }

  public toggleItem(id: number): void {
    this.todos.update(value => value.map(item => item.id === id ? {...item, completed: !item.completed } : item));
  }

  public toggleAll(completed: boolean): void {
    this.todos.update(value => value.map(item => ({ ...item, completed })));
  }

  public getItems(status: TodoTab): Todo[] {
    switch (status) {
      case TodoTab.Active:
        return this.todos().filter(item => !item.completed);
      case TodoTab.Completed:
        return this.todos().filter(item => item.completed);
      default:
        return this.todos();

    }

    return this.todos()
  }
}
