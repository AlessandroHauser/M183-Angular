import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "./Todo";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    url = 'http://localhost:8080';
    constructor(private http: HttpClient) {

    }

    public getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url + '/todos');
    }
}
