

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { RandomJokesResponse } from "../types/random-jokes-response.interface"; 

@Injectable({
    providedIn: 'root'
})
export class JokesService {

    constructor(private http: HttpClient) { }

    getRandomJoke() {
        const url = 'https://api.chucknorris.io/jokes/random';
        return this.http.get<RandomJokesResponse>(url);
    }
    getJokeCategory() {
        const url = 'https://api.chucknorris.io/jokes/categories';
        return this.http.get<string[]>(url)
    }

}
