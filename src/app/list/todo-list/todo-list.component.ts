import {Component, OnInit} from '@angular/core';
import {Todo} from "../Todo";
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {Status} from "../Status";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {ClientService} from "../client.service";

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
    constructor(private clientService: ClientService) { }

    private todos$: Observable<Todo[]> = this.clientService.getTodos();
    ngOnInit(): void {
        this.todos$.subscribe(todos => {
            this.todos = todos;
        })
    }
    protected todos: Todo[] = [];

    protected readonly Status = Status;
}
