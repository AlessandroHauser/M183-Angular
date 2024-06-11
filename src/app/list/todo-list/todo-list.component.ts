import {Component, OnInit} from '@angular/core';
import {Todo} from "../Todo";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {Status} from "../Status";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {ClientService} from "../client.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
        MatTable,
        NgForOf,
        MatButton,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
    constructor(
        private clientService: ClientService,
        private snackBar: MatSnackBar) {
    }

    private todos$: Observable<Todo[]> = this.clientService.getTodos();
    protected todos: Todo[] = [];

    ngOnInit(): void {
        this.todos$.subscribe(todos => {
            this.todos = todos;
        })
        this.todos = [
            {id: 1, task: 'Buy groceries', status: Status.IN_PROGRESS, date: new Date()},
            {id: 2, task: 'Clean the house', status: Status.DONE, date: new Date()},
            {id: 3, task: 'Finish project report', status: Status.IN_PROGRESS, date: new Date()},
            {id: 4, task: 'Schedule meeting with team', status: Status.DONE, date: new Date()},
            {id: 5, task: 'Prepare presentation slides', status: Status.IN_PROGRESS, date: new Date()},
            {id: 6, task: 'Call the plumber', status: Status.DONE, date: new Date()},
            {id: 7, task: 'Respond to emails', status: Status.IN_PROGRESS, date: new Date()},
            {id: 8, task: 'Complete the budget analysis', status: Status.DONE, date: new Date()},
            {id: 9, task: 'Write a blog post', status: Status.IN_PROGRESS, date: new Date()},
            {id: 10, task: 'Plan the weekend trip', status: Status.DONE, date: new Date()},
            {id: 11, task: 'Attend the workshop', status: Status.IN_PROGRESS, date: new Date()},
            {id: 12, task: 'Read the new book', status: Status.DONE, date: new Date()},
            {id: 13, task: 'Update the website', status: Status.IN_PROGRESS, date: new Date()},
            {id: 14, task: 'Organize the desk', status: Status.DONE, date: new Date()},
            {id: 15, task: 'Send the birthday card', status: Status.IN_PROGRESS, date: new Date()},
            {id: 16, task: 'Fix the bug in the code', status: Status.DONE, date: new Date()},
            {id: 17, task: 'Practice yoga', status: Status.IN_PROGRESS, date: new Date()},
            {id: 18, task: 'Prepare for the interview', status: Status.DONE, date: new Date()},
            {id: 19, task: 'Renew the subscription', status: Status.IN_PROGRESS, date: new Date()},
            {id: 20, task: 'Backup the files', status: Status.DONE, date: new Date()}
        ];
    }

    createTodo(task: string) {
        const todo = new Todo(0, task, Status.IN_PROGRESS, new Date(Date.now()))
        this.clientService.createTodo(todo).subscribe(todo => {
            this.todos.push(todo);
            this.snackBar.open('Todo created', 'Close');
        })
    }

    updateTodo(todo: Todo, textAreaElement: HTMLTextAreaElement) {
        textAreaElement.disabled = true;
        todo.task = textAreaElement.value;
        this.sendUpdate(todo)
        console.log(todo)
    }

    updateStatus(todo: Todo) {
        todo.status = Status.DONE;
        this.sendUpdate(todo);
    }

    sendUpdate(todoU: Todo) {
        this.clientService.updateTodo(todoU).subscribe(todo => {
            let removeIndex: number = this.todos.findIndex((t: Todo) => t.id == todo.id);
            this.todos = [...this.todos.slice(0, removeIndex), todo, ...this.todos.slice(removeIndex + 1)]
            this.snackBar.open('Todo updated', 'Close');
        })
    }

    deleteTodo(id: number) {
        this.clientService.deleteTodo(id).subscribe(_ => {
            let removeIndex: number = this.todos.findIndex((t: Todo) => t.id == id);
            this.todos = [...this.todos.slice(0, removeIndex), ...this.todos.slice(removeIndex + 1)]
            this.snackBar.open('Todo deleted', 'Close');
        });
    }

    protected readonly Status = Status;
}
