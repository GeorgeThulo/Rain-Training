
export class Fetch {
 static readonly type = '[Category Jokes] Fetch'
}
export class FetchSuccess {
 static readonly type = '[Category Jokes] success'
 constructor(public response: string[]){}    
}
export class FetchFail {
 static readonly type = '[Category Jokes] fail'
 constructor(public error: unknown){}  
}
export class clear {
 static readonly type = '[Category Jokes] clear'
}