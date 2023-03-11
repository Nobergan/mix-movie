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

  addToFavourites(e, film: CategoryFilm, routeType: string) {
    const isFilmAlreadyInFavourites = this.favouritesFilms.some(f => f.id === film.id);
    if (!isFilmAlreadyInFavourites) {
      const favouriteFilm = { ...film, type: routeType };
      favouriteFilm.poster_path = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
      this.favouritesFilms.push(favouriteFilm);
      localStorage.setItem('favourites', JSON.stringify(this.favouritesFilms));
    }

    const favouriteItem = e.target as HTMLElement;
    favouriteItem.classList.toggle('is-hidden');
    const favouriteItemActive = favouriteItem.nextElementSibling as HTMLElement;
    favouriteItemActive.classList.toggle('is-hidden');
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

  onMouseOver(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = './assets/images/icons/favourite-icon-active.svg';
  }

  onMouseOut(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = './assets/images/icons/favourite-icon.svg';
  }
}
