

import { RandomJokesResponse } from "../types/random-jokes-response.interface"

export class Fetch { // basically just the name of your action you want to dispatch
    static readonly type = '[Random Jokes] Fetch'
}

export class FetchSuccess {
    static readonly type = '[Random Jokes] Fetch Success'
    constructor(public response: RandomJokesResponse){}    
}

export class FetchFail {
    static readonly type = '[Random Jokes] Fetch Fail'
    constructor(public error: unknown){}    
}

export class Clear {
    static readonly type = '[Random Jokes] Clear'
}