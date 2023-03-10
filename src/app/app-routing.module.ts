import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainComponent} from "./main/main.component";
import {CategoryFilmsComponent} from "./categories/category-films/category-films.component";
import {CategorySeriesComponent} from "./categories/category-series/category-series.component";
import {FavouritesComponent} from "./favourites/favourites.component";
import {FilmPageComponent} from "./film/film-page.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AuthGuard} from "./auth/auth.guard";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'movie', component: CategoryFilmsComponent,  },
  { path: 'movie/:id', component: FilmPageComponent, data: { type: 'movie' } },
  { path: 'tv', component: CategorySeriesComponent },
  { path: 'tv/:id', component: FilmPageComponent, data: { type: 'tv' } },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Такої сторінки не існує!'}},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
