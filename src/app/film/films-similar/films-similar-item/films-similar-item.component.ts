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
    this.filmsService.addToFavourites(e, film, this.media_type);
  }

  removeFromFavourites(e, film: Film) {
    e.stopPropagation();
    this.filmsService.removeFromFavourites(film.id);
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

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
