import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainSliderComponent } from "./main/main-slider/main-slider.component";
import { HeaderComponent } from "./header/header.component";
import { SlidersComponent } from './main/sliders/sliders.component';
import { SlidersItemsComponent } from './main/sliders/sliders-items/sliders-items.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFilmsComponent } from './categories/category-films/category-films.component';
import { CategorySeriesComponent } from './categories/category-series/category-series.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { FilmPageComponent } from './film/film-page.component';
import { FilmsSimilarComponent } from './film/films-similar/films-similar.component';
import { FilmsSimilarItemComponent } from './film/films-similar/films-similar-item/films-similar-item.component';
import { FooterComponent } from './footer/footer.component';
import { FilmsSearchComponent } from './header/films-search/films-search.component';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SwiperModule } from "swiper/angular";
import { SafePipe } from "./shared/safe.pipe";
import { DatePipe } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CategoryFilmsComponent,
    FilmPageComponent,
    MainSliderComponent,
    FavouritesComponent,
    CategorySeriesComponent,
    SafePipe,
    FilmsSimilarComponent,
    FilmsSimilarItemComponent,
    CategoriesComponent,
    SlidersComponent,
    SlidersItemsComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    ErrorPageComponent,
    FilmsSearchComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
