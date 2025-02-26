import { Component, DoCheck } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Você deseja deletar a lista?");
    if (confirm) {
      this.taskList = [];
    }
  }

  public newItemTask(value: string) {
    this.taskList.push({ task: value, checked: false });
  }

  public validationTask(event: string, i: number) {
    if (!event.length) {
      const confirm = window.confirm("Você deseja apagar essa task?");
      if (confirm) {
        this.deleteItemTaskList(i);
      }
    } else {
      console.log(i);
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

  // Método para manipular o drag-and-drop
  public drop(event: CdkDragDrop<TaskList[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }
}
