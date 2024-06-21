import { Action, Selector, State, StateContext } from "@ngxs/store";
import { RandomJokesResponse } from "../types/random-jokes-response.interface";
import { Injectable } from "@angular/core";
import { JokesService } from "../services/jokes.service";
import { RandomJokesActions } from "../actions";
import { tap } from "rxjs";

const getDefaults = () => {
    return {
        loading: false,
        data: null,
        error: null
    }
}

interface RandomJokesStateModel {
    loading: boolean;
    error: unknown;
    data: RandomJokesResponse | null
}

@State<RandomJokesStateModel>({
    name: 'RandomJokesState',
    defaults: getDefaults()
})
@Injectable()
export class RandomJokesState {

    @Selector()
    static isLoading(state: RandomJokesStateModel) { return state.loading }

    @Selector()
    static getData(state: RandomJokesStateModel) { return state.data }

    @Selector()
    static getError(state: RandomJokesStateModel) { return state.error }

    constructor(private jokesService: JokesService) { }

    @Action(RandomJokesActions.Fetch)
    Fetch(ctx: StateContext<RandomJokesStateModel>) {
        ctx.patchState({ loading: true })

        return this.jokesService.getRandomJoke()
            .pipe(
                tap({
                    next: res => ctx.dispatch(new RandomJokesActions.FetchSuccess(res)),
                    error: err => ctx.dispatch(new RandomJokesActions.FetchFail(err))
                })
            )
    }

    @Action(RandomJokesActions.FetchSuccess)
    FetchSuccess(ctx: StateContext<RandomJokesStateModel>, action: RandomJokesActions.FetchSuccess) {
        ctx.patchState({
            loading: false,
            error: null,
            data: action?.response
        })
    }

    @Action(RandomJokesActions.FetchFail)
    FetchFail(ctx: StateContext<RandomJokesStateModel>, action: RandomJokesActions.FetchFail) {
        ctx.patchState({
            loading: false,
            data: null,
            error: action?.error
        })
    }

    @Action(RandomJokesActions.Clear)
    Clear(ctx: StateContext<RandomJokesStateModel>) {
        ctx.setState(getDefaults())
    }

}
