import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { JokesService } from "../services/jokes.service";
import { tap } from "rxjs";
import { CategoryJokesAction } from "../actions"; 


const getDefaults = () => {
   return { 
    loading: false,
    error: null,
    category: null
   }
};

interface CategoryJokesStateModel {
    loading: Boolean;
    error: unknown;
    category: string[] | null
    
}

@State<CategoryJokesStateModel>({
    name: 'CategoryJokeState',
    defaults: getDefaults()
})
@Injectable()
 export class CategoryJokeState {

    @Selector()
    static isLoading(state:CategoryJokesStateModel){return state.loading}

    @Selector()
    static getError(state:CategoryJokesStateModel){return state.error}

    @Selector()
    static getCategory(state:CategoryJokesStateModel){return state.category}

    constructor (private jokesService: JokesService) {}

    @Action(CategoryJokesAction.Fetch)
    Fetch(ctx: StateContext<CategoryJokesStateModel>) {
        ctx.patchState({ loading: true })

        return this.jokesService.getJokeCategory()
            .pipe(
                tap({
                    next: res => ctx.dispatch(new CategoryJokesAction.FetchSuccess(res)),
                    error: err => ctx.dispatch(new CategoryJokesAction.FetchFail(err))
                })
            )
    }

    @Action(CategoryJokesAction.FetchSuccess)
    FetchSuccess(ctx: StateContext<CategoryJokesStateModel>, action: CategoryJokesAction.FetchSuccess) {
        ctx.patchState({
            loading: false,
            error: null,
            category: action?.response
        })
    }

    @Action(CategoryJokesAction.FetchFail)
    FetchFail(ctx: StateContext<CategoryJokesStateModel>, action: CategoryJokesAction.FetchFail) {
        ctx.patchState({
            loading: false,
            category: null,
            error : action?.error
            
        })
    }

    @Action(CategoryJokesAction.clear)
    Clear(ctx: StateContext<CategoryJokesStateModel>) {
        ctx.setState(getDefaults())
    }

}
    
 
