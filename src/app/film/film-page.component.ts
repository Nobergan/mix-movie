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

  addToFavourites(film) {
    film.type = this.media_type;
    const favouriteFilm = { ...film, type: film.type };
    favouriteFilm.poster_path = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

    this.filmsService.addToFavourites(favouriteFilm);

    this.isFavourite = true;

    const favouriteItem = document.querySelectorAll(".film__item-favourite");
    const favouriteItemActive = document.querySelectorAll(".film__item-favourite--active");

    favouriteItem.forEach((item, index) => {
      if (this.filmData$.value.film.id === film.id) {
        item.classList.toggle('is-hidden');
        favouriteItemActive[index].classList.toggle('is-hidden');
      }
    });
  }

  isFilmInFavourites(film) {
    return this.filmsService.getFavouritesFilms().some(f => f.id === film.id);
  }

  onMouseOver(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/icons/favourite-icon-active.svg';
  }

  onMouseOut(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/icons/favourite-icon.svg';
  }

  ngOnDestroy(): void {
    this.filmData$.next(null);
    this.filmSub.unsubscribe();
  }
}
