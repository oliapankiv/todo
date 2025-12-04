import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

import { TodoService } from '../../services/todo.service';

import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoInputComponent } from '../todo-input/todo-input.component';

import { TodoTab } from '../../enums/todo-tab.enum';

interface Tab {
  label: string,
  tab: TodoTab,
}

@Component({
  selector: 'todo-list',
  imports: [MatTabsModule, MatCheckboxModule, TodoItemComponent, TodoInputComponent, RouterLink, RouterLinkActive, ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit, OnDestroy {
  public readonly todos = computed(() => this.todoService.getItems(this.tab()))
  public readonly activeTodos = computed(() => this.todos().filter(item => !item.completed))

  public readonly tabs: Tab[] = [
    { label: 'All', tab: TodoTab.All },
    { label: 'Active', tab: TodoTab.Active },
    { label: 'Completed', tab: TodoTab.Completed },
  ]

  private readonly tab = signal<TodoTab>(TodoTab.All);

  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);

  private sub!: Subscription;

  public ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => this.tab.set(params['tab']))
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onRemoveTodo(id: number): void {
    this.todoService.removeItem(id);
  }

  public onToggleTodo(id: number): void {
    this.todoService.toggleItem(id);
  }

  public toggleAll(event: MatCheckboxChange) {
    this.todoService.toggleAll(event.checked);
  }

  public onClearCompletedClick(): void {
    this.todoService.removeCompleted()
  }
}
