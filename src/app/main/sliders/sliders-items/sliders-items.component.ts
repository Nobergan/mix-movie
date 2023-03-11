import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Film } from "../../../shared/models/film.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../../auth/auth.service";
import { FilmsService } from "../../../shared/services/films.service";

@Component({
  selector: 'app-sliders-items',
  templateUrl: './sliders-items.component.html',
  styleUrls: ['./sliders-items.component.scss']
})
export class SlidersItemsComponent implements OnInit, OnDestroy {
  @Input() film: Film;
  isAuthenticated = false;
  private userSub: Subscription;
  @Input() routeType: string;

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

  addToFavourites(e, film) {
    e.stopPropagation();
    this.filmsService.addToFavourites(e, film, this.routeType);
  }

  removeFromFavourites(e, film: Film) {
    e.stopPropagation();
    this.filmsService.removeFromFavourites(film.id);
  }

  onLoadFilm(id) {
    this.router.navigate([`${this.routeType}`, id]);
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
