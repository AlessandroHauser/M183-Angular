import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {TodoListComponent} from "./list/todo-list/todo-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, MatButton, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'M183';

    login() {
        console.log("logging in")
    }
}
