import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { NgForm } from "@angular/forms";

import { DataStorageService } from "../../shared/data-storage.service";
import { Film } from "../../shared/models/film.model";

@Component({
  selector: 'app-films-search',
  templateUrl: './films-search.component.html',
  styleUrls: ['./films-search.component.scss']
})
export class FilmsSearchComponent implements OnInit, OnDestroy {
  query: string;
  films: Film[];
  filmClicked = false;
  isSymbol = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    document.addEventListener('click', this.hideFilmList.bind(this));
  }

  hideFilmList(event) {
    const filmList = document.querySelector('.form__list');
    const input = document.querySelector('.form__input');
    if (filmList && !filmList.contains(event.target) && input !== event.target) {
      this.films = null;
    }
  }

  search() {
    if (!/^[a-zA-Z0-9а-яА-Я\s]*$/.test(this.query)) {
      this.isSymbol = true;
      this.films = null;
      return;
    }

    this.isSymbol = false;
    this.filmClicked = false;
    this.dataStorageService.searchFilms(this.query).pipe(
      map(results => results.results.filter(result => result.media_type === 'movie' || result.media_type === 'tv')),
      tap(films => {
        this.films = films.map(film => ({
          ...film,
          media_type: film.media_type || 'movie'
        }));
      })
    ).subscribe();
  }

  onLoadFilm(id, form: NgForm, mediaType) {
    this.router.navigate([`/${mediaType}`, id], {relativeTo: this.route});
    form.reset();
    this.filmClicked = true;
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.hideFilmList.bind(this));
  }
}
