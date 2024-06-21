import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Select, Store } from '@ngxs/store';
import { RandomJokesState } from './store/states/random-jokes.state';
import { Observable } from 'rxjs';
import { RandomJokesResponse } from './store/types/random-jokes-response.interface';
import { CategoryJokesAction, RandomJokesActions } from './store/actions'; 
import { CategoryJokeState } from './store/states/category-jokes.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @Select(RandomJokesState.getData) data$!: Observable<RandomJokesResponse> // change name
  @Select(RandomJokesState.isLoading) isLoading$!: Observable<boolean>
  @Select(CategoryJokeState.getData) category$!: Observable<string[]>

  //title = 'WEIRDO';
  //first_name = ''; 
  //last_name = '';
  //joke ='';

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  onJokeCategory(){
    this.store.dispatch(new CategoryJokesAction.Fetch())
  }

  onRandomJoke(){
    this.store.dispatch(new RandomJokesActions.Fetch())
  }
  
  onClear(){
    this.store.dispatch(new RandomJokesActions.Clear())    
  }   
     
}