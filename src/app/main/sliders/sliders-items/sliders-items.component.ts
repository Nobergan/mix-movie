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
    film.type = this.routeType;
    console.log(film.type)
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

  onLoadFilm(id) {
    this.router.navigate([`${this.routeType}`, id]);
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
