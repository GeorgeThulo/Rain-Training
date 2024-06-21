import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { RandomJokesState } from './store/states/random-jokes.state';
import { CategoryJokeState } from './store/states/category-jokes.state';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      selectorOptions: {
          injectContainerState: false,
      }
  }),
  NgxsModule.forFeature([
    RandomJokesState,
    CategoryJokeState
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
