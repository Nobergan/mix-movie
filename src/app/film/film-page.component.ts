import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { BehaviorSubject, Subscription, zip } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import { FilmsService } from "../shared/services/films.service";
import { Film } from "../shared/models/film.model";
import { DataStorageService } from "../shared/data-storage.service";
import { FilmReviews } from "../shared/models/reviews.model";
import {AuthService} from "../auth/auth.service";

interface FilmDataModel {
  film: Film,
  similarFilms: Film[];
  videoUrl: string;
  reviews: FilmReviews[];
}

@Component({
  selector: 'app-film',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit, OnDestroy {
  private filmSub: Subscription
  filmData$ = new BehaviorSubject<FilmDataModel>(null);
  filmDataObs$ = this.filmData$.asObservable();
  media_type = this.route.snapshot.data['type'];
  isAuthenticated = false;
  isFavourite = false;

  constructor(
    private route: ActivatedRoute,
    private sliderFilmService: FilmsService,
    private dataStorageService: DataStorageService,
    private filmsService: FilmsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.filmSub = this.route.params.pipe(
      map((params: Params) => ({
        id: Number(params['id']),
        type: this.route.snapshot.data['type']
      })),
      switchMap(
        params => zip(
          this.dataStorageService.fetchFilm(params.id, params.type),
          this.dataStorageService.fetchFilmTrailer(params.id, params.type),
          this.dataStorageService.fetchSimilarFilms(params.id, params.type),
          this.dataStorageService.fetchFilmReviews(params.id, params.type)
        )
      ),
      tap(([film, trailer, similarFilms, reviews]) => {
        this.filmData$.next({
          film,
          videoUrl: trailer.results?.length > 0 ? `https://www.youtube.com/embed/${trailer.results[0].key}` : null,
          similarFilms: similarFilms.results,
          reviews: reviews.results
        })
        if (this.filmData$.value && this.filmData$.value.film) {
          this.isFavourite = this.isFilmInFavourites(this.filmData$.value.film);
        }
      })
    ).subscribe();

    document.documentElement.scrollTop = 0;

    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    if (this.filmData$.value && this.filmData$.value.film) {
      this.isFavourite = this.isFilmInFavourites(this.filmData$.value.film);
    }
  }


  openAllReview(e) {
    const reviewBtn = document.querySelectorAll(".review__text-link");

    reviewBtn.forEach(btn => {
      if (e.target === btn) {
        btn.previousElementSibling.classList.toggle('show');
        btn.innerHTML == 'Читати повністю' ? btn.innerHTML = 'Згорнути' : btn.innerHTML = 'Читати повністю';
      }
    })
  }

  addToFavourites(e, film) {
    e.stopPropagation();
    this.filmsService.addToFavourites(e, film, this.media_type);
    this.isFavourite = true;
  }

  removeFromFavourites(e, film: Film) {
    e.stopPropagation();
    this.filmsService.removeFromFavourites(film.id);
    this.isFavourite = false;
  }

  isFilmInFavourites(film) {
    return this.filmsService.getFavouritesFilms().some(f => f.id === film.id);
  }

  onMouseOverFavourite(event: MouseEvent) {
    this.filmsService.onMouseOver(event);
  }

  onMouseOutFavourite(event: MouseEvent) {
    this.filmsService.onMouseOut(event);
  }

  ngOnDestroy(): void {
    this.filmData$.next(null);
    this.filmSub.unsubscribe();
  }
}
