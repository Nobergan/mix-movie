import { Injectable } from "@angular/core";

import { CategoryFilm } from "../models/category-film.model";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  favouritesFilms: CategoryFilm[] = [];

  constructor() {
    const favourites = localStorage.getItem('favourites');
    this.favouritesFilms = favourites ? JSON.parse(favourites) : [];
  }

  addToFavourites(film: CategoryFilm) {
    const isFilmAlreadyInFavourites = this.favouritesFilms.some(f => f.id === film.id);
    if (!isFilmAlreadyInFavourites) {
      const favouriteFilm = {...film};
      this.favouritesFilms.push(favouriteFilm);
      localStorage.setItem('favourites', JSON.stringify(this.favouritesFilms));
    }
  }

  getFavouritesFilms() {
    return this.favouritesFilms.map(film => ({...film, isFavourite: true, type: film.type}));
  }

  removeFromFavourites(id: number) {
    const filmIndex = this.favouritesFilms.findIndex(f => f.id === id);
    if (filmIndex !== -1) {
      this.favouritesFilms.splice(filmIndex, 1);
      localStorage.setItem('favourites', JSON.stringify(this.favouritesFilms));
    }
  }
}
