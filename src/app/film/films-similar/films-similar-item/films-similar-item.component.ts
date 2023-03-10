import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Film } from "../../../shared/models/film.model";
import {AuthService} from "../../../auth/auth.service";
import {FilmsService} from "../../../shared/services/films.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-films-similar-item',
  templateUrl: './films-similar-item.component.html',
  styleUrls: ['./films-similar-item.component.scss']
})
export class FilmsSimilarItemComponent implements OnInit, OnDestroy {
  @Input() film: Film;
  media_type = this.route.snapshot.data['type'];
  isAuthenticated = false;
  @Input() routeType: string;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private filmsService: FilmsService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLoadFilm(id) {
    this.router.navigate([`/${this.media_type}`, id], {relativeTo: this.route});

    document.documentElement.scrollTop = 0;
  }

  addToFavourites(e, film) {
    e.stopPropagation();
    film.type = this.media_type;
    const favouriteFilm = { ...film, type: film.type };
    favouriteFilm.poster_path = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

    this.filmsService.addToFavourites(favouriteFilm);

    const favouriteItem = document.querySelectorAll(".film__item-favourite");
    const favouriteItemActive = document.querySelectorAll(".film__item-favourite--active");

    favouriteItem.forEach((item, index) => {
      if (e.target === item) {
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
